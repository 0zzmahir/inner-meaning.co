// scripts/generate-pages.cjs
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.OPENROUTER_API_KEY;
if (!API_KEY) {
  console.error("❌ OPENROUTER_API_KEY bulunamadı. .env dosyanı kontrol et.");
  process.exit(1);
}

// ↓↓↓ SLUG HER ZAMAN BURADAN ÜRETİLECEK ↓↓↓
function slugifyFromTitle(title = "") {
  return title
    .toLowerCase()
    .replace(/['’]/g, "") // rubik’s -> rubiks
    .replace(/[^a-z0-9]+/g, "-") // boşluk + diğer her şey -> -
    .replace(/^-+|-+$/g, ""); // baş/son tireleri temizle
}

// Aynı anda kaç içerik üretilecek?
const CONCURRENCY = 6;

// JSON yolları
const topicsPath = path.join(__dirname, "..", "data", "topics.json");
const pagesPath = path.join(__dirname, "..", "data", "pages.generated.json");

// topics & mevcut sayfalar
const allTopics = JSON.parse(fs.readFileSync(topicsPath, "utf8"));
const existing = fs.existsSync(pagesPath)
  ? JSON.parse(fs.readFileSync(pagesPath, "utf8"))
  : [];

// Mevcut slug seti (sayfalardan)
const existingSlugs = new Set(existing.map((p) => p.slug));

// Topic’lerin slug’ını garanti altına al (topic.slug yoksa title’dan üret)
const normalizedTopics = allTopics.map((t) => {
  const safeSlug = t.slug && t.slug.trim().length > 0 ? t.slug : slugifyFromTitle(t.title);
  return { ...t, slug: safeSlug };
});

// Üretilecek olanlar (daha önce yazılmamış slug'lar)
const queue = normalizedTopics.filter((t) => t.slug && !existingSlugs.has(t.slug));

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

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      "HTTP-Referer": "https://inner-meaning.com",
      "X-Title": "Inner Meaning Generator",
    },
    body: JSON.stringify({
      // ❗ Buraya OpenRouter'dan kullandığın gerçek model ID'sini yaz:
      model: "amazon/nova-2-lite-v1:free", // örn: "google/gemini-2.0-flash-exp:free" veya "amazon/...:free"
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`❌ API error for ${safeSlug}:`, err);
    throw new Error("API error");
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    console.error("❌ API response has no content for:", safeSlug, data);
    throw new Error("Empty content");
  }

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    console.error("❌ JSON parse error. Raw content:", content);
    throw e;
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

  fs.writeFileSync(pagesPath, JSON.stringify(existing, null, 2));
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
  console.log(`⚙️ Paralel worker sayısı: ${CONCURRENCY}\n`);

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
