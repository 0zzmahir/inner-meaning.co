// scripts/generate-topics.cjs
// Inner Meaning için OTOMATİK TOPIC FABRİKASI
// Tek komutla 100K'ya kadar topic üretir, duplike slugsları atlar.

const fs = require("fs");
const path = require("path");
const fetch = global.fetch || require("node-fetch");

// 🔧 AYARLAR
const TARGET_TOPIC_COUNT = 2000; // Kaça kadar tamamlasın? 10K / 50K / 100K sen bilirsin.
const BATCH_SIZE = 50; // Her API çağrısında kaç topic istensin.
const MAX_RETRIES = 3;

const MODEL = "deepseek/deepseek-r1-0325"; // OpenRouter üzerindeki model adın (istersen gpt-4.1-mini yaparsın)
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.OPENROUTER_API_KEY;

if (!API_KEY) {
  console.error("❌ OPENROUTER_API_KEY bulunamadı. .env dosyasını kontrol et.");
  process.exit(1);
}

const topicsPath = path.join(__dirname, "..", "data", "topics.json");

// Güvenli JSON okuma
function readJsonSafe(filepath, defaultValue) {
  if (!fs.existsSync(filepath)) return defaultValue;
  try {
    const raw = fs.readFileSync(filepath, "utf8");
    if (!raw.trim()) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.error("JSON okuma hatası:", filepath, e.message);
    return defaultValue;
  }
}

// Slug normalize (kebab-case)
function toSlug(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function main() {
  let topics = readJsonSafe(topicsPath, []);
  if (!Array.isArray(topics)) topics = [];

  const existingSlugs = new Set(
    topics
      .map((t) => t.slug)
      .filter(Boolean)
      .map((s) => String(s).toLowerCase())
  );

  console.log(`📚 Mevcut topic sayısı: ${topics.length}`);
  console.log(`🎯 Hedef topic sayısı: ${TARGET_TOPIC_COUNT}`);

  if (topics.length >= TARGET_TOPIC_COUNT) {
    console.log("✅ Zaten hedefe ulaşmışsın, yeni topic üretmeye gerek yok.");
    process.exit(0);
  }

  while (topics.length < TARGET_TOPIC_COUNT) {
    const remaining = TARGET_TOPIC_COUNT - topics.length;
    const batchSize = Math.min(BATCH_SIZE, remaining);

    console.log(
      `\n🚀 Yeni batch: ${batchSize} topic istiyorum (kalan hedef: ${remaining})`
    );

    const batch = await generateTopicBatch(batchSize, existingSlugs);

    if (!batch || batch.length === 0) {
      console.log("⚠ Boş batch döndü, biraz bekleyip tekrar deneyeceğim...");
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }

    // Yeni topic'leri listeye ekle
    for (const t of batch) {
      const slug = toSlug(t.slug || t.title);
      if (!slug || existingSlugs.has(slug)) continue;

      topics.push({
        slug,
        title: t.title,
        category: t.category,
        focus: t.focus,
      });
      existingSlugs.add(slug);
    }

    // Her batch'ten sonra diske yaz (çökerse kaldığın yerden devam et)
    fs.writeFileSync(topicsPath, JSON.stringify(topics, null, 2), "utf8");

    console.log(`✅ Şu an toplam topic sayısı: ${topics.length}`);
  }

  console.log("\n🎉 TOPIC FABRİKASI BİTTİ!");
  console.log(`Toplam topic sayısı: ${topics.length}`);
}

// Tek bir batch için LLM'den topic isteyen fonksiyon
async function generateTopicBatch(batchSize, existingSlugs) {
  const systemPrompt = `
You are a topic generator for a website called "Inner Meaning" (inner-meaning.com).

Your job:
- Generate highly searchable, realistic English topics about:
  - Spiritual signs
  - Dream meanings
  - Strange or unexplained events
  - Emotional signals
  - Mind patterns / psychology

Think like Google users: real, everyday questions people actually type such as:
- "why do i wake up at 3am every night"
- "left ear burning spiritual meaning"
- "seeing 11:11 every day meaning"
- "why do i feel empty when nothing is wrong"
- "why do my relationships always end after three months"

Return ONLY a JSON array. NO backticks, NO extra text.

Each topic object MUST have this exact shape:

{
  "slug": string,          // short, url-friendly, lowercase, words separated with dashes
  "title": string,         // nice human-readable title
  "category": string,      // one of: "Spiritual Signs", "Dream Meanings", "Strange Events", "Emotional Signals", "Mind Patterns"
  "focus": string          // short description in English (3-10 words), why people search this, emotional angle
}

Rules:
- All topics must be UNIQUE and not minor variations of each other.
- Use natural, conversational English as people search in Google.
- Mix all five categories in the batch.
- Titles should feel like YouTube / blog headlines (but not clickbait).
- Avoid generic horoscope topics; focus on odd, specific, recurring experiences.
`;

  const userPrompt = `
Generate ${batchSize} brand new topics.

Do NOT include any of these existing slugs (case insensitive): 
${Array.from(existingSlugs).slice(0, 400).join(", ")}

Return ONLY a JSON array of topic objects, nothing else.
`;

  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://inner-meaning.com",
          "X-Title": "Inner Meaning Topic Generator",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.9,
          response_format: { type: "json_object" }, // bazı modeller array'i "content"te string olarak verir
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(
          `API ${res.status}: ${txt.slice(0, 200).replace(/\s+/g, " ")}`
        );
      }

      const data = await res.json();
      let content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("Boş content döndü.");
      }

      // Content bir array değilse, objenin içinde "topics" alanı olabilir, esnek olalım
      let parsed;
      try {
        parsed = JSON.parse(content);
      } catch (e) {
        throw new Error("JSON parse hatası: " + e.message);
      }

      let arr = [];
      if (Array.isArray(parsed)) {
        arr = parsed;
      } else if (Array.isArray(parsed.topics)) {
        arr = parsed.topics;
      } else {
        throw new Error("Beklenmeyen JSON şekli, array bulamadım.");
      }

      // Güvenlik: şekli normalize et
      const cleaned = arr
        .map((t) => ({
          slug: toSlug(t.slug || t.title),
          title: String(t.title || "").trim(),
          category: String(t.category || "").trim(),
          focus: String(t.focus || "").trim(),
        }))
        .filter((t) => t.slug && t.title);

      return cleaned;
    } catch (err) {
      lastError = err;
      console.log(
        `   ⚠ Topic batch deneme ${attempt}/${MAX_RETRIES} hata:`,
        err.message || err
      );
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }

  console.log(
    "   ❌ Topic batch üretilemedi. Son hata:",
    lastError && lastError.message
  );
  return [];
}

main().catch((e) => {
  console.error("Beklenmeyen hata:", e);
  process.exit(1);
});
