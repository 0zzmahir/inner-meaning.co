// scripts/generate-pages.cjs
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const fetch = global.fetch || require("node-fetch"); // 🔥 Node'ta fetch yoksa garanti et

// 🔑 Çoklu API key desteği (round-robin)
const API_KEYS = [
  process.env.OPENROUTER_API_KEY, // eski tek key'in varsa hâlâ çalışsın
  process.env.OPENROUTER_KEY_1,
  process.env.OPENROUTER_KEY_2,
  process.env.OPENROUTER_KEY_3,
  process.env.OPENROUTER_KEY_4,
  process.env.OPENROUTER_KEY_5,
].filter(Boolean);

if (!API_KEYS.length) {
  console.error(
    "❌ Hiç OpenRouter API key bulunamadı. Lütfen .env içine OPENROUTER_KEY_1 veya OPENROUTER_API_KEY ekle."
  );
  process.exit(1);
}

let apiIndex = 0;
function getNextKey() {
  const key = API_KEYS[apiIndex];
  apiIndex = (apiIndex + 1) % API_KEYS.length;
  return key;
}

// 🔁 Çoklu model desteği (round-robin)
// Not: DeepSeek modeli daha önce hatalı ID nedeniyle 400 döndürmüştü.
// Bu yüzden en az bir stabil free model aktif tutmak mantıklı.
const MODELS = [
 "amazon/nova-2-lite-v1:free",
 "google/gemini-2.0-flash-exp:free",
 "qwen/qwen3-coder:free",
 "deepseek/deepseek-r1-0528-qwen3-8b", 
].filter(Boolean);

if (!MODELS.length) {
  console.error("❌ MODELS listesi boş. En az 1 model eklemen lazım.");
  process.exit(1);
}

let modelIndex = 0;
function getNextModel() {
  const m = MODELS[modelIndex];
  modelIndex = (modelIndex + 1) % MODELS.length;
  return m;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ↓↓↓ SLUG HER ZAMAN BURADAN ÜRETİLECEK ↓↓↓
function slugifyFromTitle(title = "") {
  return String(title)
    .toLowerCase()
    .replace(/['’]/g, "") // rubik’s -> rubiks
    .replace(/[^a-z0-9]+/g, "-") // boşluk + diğer her şey -> -
    .replace(/^-+|-+$/g, ""); // baş/son tireleri temizle
}

// Aynı anda kaç içerik üretilecek?
const CONCURRENCY = 5;

// JSON yolları
const topicsPath = path.join(__dirname, "..", "data", "topics.json");
const pagesPath = path.join(__dirname, "..", "data", "pages.generated.json");

// Güvenli JSON okuma (topics/pages bozulursa script komple çakılmasın)
function readJsonSafe(filepath, defaultValue) {
  if (!fs.existsSync(filepath)) return defaultValue;
  try {
    const raw = fs.readFileSync(filepath, "utf8");
    if (!raw.trim()) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.error("⚠ JSON okuma hatası:", filepath, e.message);
    return defaultValue;
  }
}

// topics & mevcut sayfalar
const allTopics = readJsonSafe(topicsPath, []);
const existing = readJsonSafe(pagesPath, []);

// Mevcut slug seti (sayfalardan)
const existingSlugs = new Set(existing.map((p) => p.slug));

// Topic’lerin slug’ını garanti altına al (topic.slug yoksa title’dan üret)
const normalizedTopics = allTopics.map((t) => {
  const safeSlug =
    t.slug && String(t.slug).trim().length > 0
      ? String(t.slug)
      : slugifyFromTitle(t.title);
  return { ...t, slug: safeSlug };
});

// Üretilecek olanlar (daha önce yazılmamış slug'lar)
const queue = normalizedTopics.filter(
  (t) => t.slug && !existingSlugs.has(t.slug)
);

const systemPrompt = `
You are a writer for a website called "Inner Meaning".
Return only a JSON object with this exact shape:

{
  "title": string,
  "category": string,
  "intro": string,
  "meaning": string,
  "spiritual": string,
  "psychological": string,
  "possibleCauses": string[],
  "advice": string,
  "faq": [
    { "q": string, "a": string },
    { "q": string, "a": string },
    { "q": string, "a": string }
  ]
}

Rules:
- Write in natural, calm, modern English.
- Do NOT mention that you are an AI.
- Keep total length around 700-900 words.
- Do NOT wrap the JSON in backticks.
`;

// TEK topic için sayfa üret
async function generateForTopic(topic) {
  // Slug her zaman bizden
  const safeSlug = topic.slug || slugifyFromTitle(topic.title);

  const userPrompt = `
Topic:
- slug: ${safeSlug}
- title: ${topic.title}
- category: ${topic.category}
- focus: ${topic.focus}

Generate the JSON now.
`;

  console.log(`✨ Generating: ${safeSlug}`);

  const MAX_RETRIES = 3;
  let data;
  let content;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const model = getNextModel();
    const key = getNextKey();

    console.log(
      `📡 [${safeSlug}] attempt ${attempt}/${MAX_RETRIES} | model=${model}`
    );

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        "HTTP-Referer": "https://inner-meaning.com",
        "X-Title": "Inner Meaning Generator",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    });

    // Rate limit (429) → bekle & tekrar dene
    if (res.status === 429) {
      console.log(
        `⏳ Rate limit for ${safeSlug} on ${model} (attempt ${attempt}/${MAX_RETRIES}) – bekliyorum...`
      );
      await sleep(3000 * attempt); // her denemede biraz daha uzun bekle
      continue;
    }

    if (!res.ok) {
      const err = await res.text();
      console.error(`❌ API error for ${safeSlug} on ${model}:`, err);
      // Model bazlı hata ise diğer denemede başka modele geçsin diye direkt throw etme, sadece loglayıp tekrar dene
      if (attempt === MAX_RETRIES) {
        throw new Error("API error (max retries reached)");
      } else {
        await sleep(1500 * attempt);
        continue;
      }
    }

    data = await res.json();
    content = data.choices?.[0]?.message?.content;
    break;
  }

  if (!content) {
    console.error("❌ API response has no content for:", safeSlug, data);
    throw new Error("Empty content");
  }

  // Bazı provider'lar content'i array/obj yapabiliyor, stringe zorla
  if (Array.isArray(content)) {
    content = content.map((c) => (typeof c === "string" ? c : "")).join(" ");
  } else if (typeof content !== "string") {
    content = String(content);
  }

  content = content.trim();

  // ```json ... ``` içinde geldiyse strip et
  if (content.startsWith("```")) {
    const first = content.indexOf("```");
    const last = content.lastIndexOf("```");
    if (last > first) {
      content = content.slice(first + 3, last).trim();
      content = content.replace(/^json/i, "").trim();
    }
  }

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    // İçinde ekstra yazı varsa sadece ilk { ... } bloğunu yakalamayı dene
    const start = content.indexOf("{");
    const end = content.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      const sub = content.slice(start, end + 1);
      try {
        parsed = JSON.parse(sub);
      } catch (e2) {
        console.error(
          "❌ JSON parse error (subslice). Raw content:\n",
          content
        );
        throw e2;
      }
    } else {
      console.error("❌ JSON parse error. Raw content:\n", content);
      throw e;
    }
  }

  // Son sayfa objesini KENDİMİZ kuruyoruz, slug HER ZAMAN safeSlug
  const finalPage = {
    slug: safeSlug,
    title: parsed.title || topic.title,
    category: parsed.category || topic.category,
    intro: parsed.intro || "",
    meaning: parsed.meaning || "",
    spiritual: parsed.spiritual || "",
    psychological: parsed.psychological || "",
    possibleCauses: Array.isArray(parsed.possibleCauses)
      ? parsed.possibleCauses
      : [],
    advice: parsed.advice || "",
    faq: Array.isArray(parsed.faq) ? parsed.faq : [],
  };

  if (existingSlugs.has(finalPage.slug)) {
    console.log(`⏩ Already exists, skipping in runtime: ${finalPage.slug}`);
    return;
  }

  existing.push(finalPage);
  existingSlugs.add(finalPage.slug);

  fs.writeFileSync(pagesPath, JSON.stringify(existing, null, 2), "utf8");
  console.log(`✅ Saved: ${finalPage.slug}`);
}

async function worker(workerId) {
  while (true) {
    const topic = queue.shift();
    if (!topic) return;

    try {
      console.log(`👷 Worker ${workerId} started: ${topic.slug}`);
      await generateForTopic(topic);
    } catch (e) {
      console.error(`❌ Worker ${workerId} error on ${topic.slug}:`, e.message);
    }
  }
}

async function main() {
  console.log(`\n📚 Toplam topic: ${allTopics.length}`);
  console.log(`✅ Zaten üretilen: ${existing.length}`);
  console.log(`🚀 Üretilecek yeni: ${queue.length}`);
  console.log(`⚙️ Paralel worker sayısı: ${CONCURRENCY}`);
  console.log(`🔑 Aktif API key sayısı: ${API_KEYS.length}`);
  console.log(`🤖 Aktif model sayısı: ${MODELS.length}\n`);

  if (queue.length === 0) {
    console.log("👌 Üretilecek yeni topic yok. Çıkılıyor.");
    return;
  }

  const workerCount = Math.min(CONCURRENCY, queue.length);
  const workers = [];

  for (let i = 0; i < workerCount; i++) {
    workers.push(worker(i + 1));
  }

  await Promise.all(workers);

  console.log(
    `\n🎉 BİTTİ! Tüm yeni sayfalar pages.generated.json içine yazıldı. Toplam sayfa: ${existing.length}`
  );
}

main().catch((e) => {
  console.error("❌ Beklenmeyen hata:", e);
  process.exit(1);
});
