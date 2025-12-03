// scripts/generate-pages.cjs
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.OPENROUTER_API_KEY;
if (!API_KEY) {
  console.error("❌ OPENROUTER_API_KEY bulunamadı. .env dosyanı kontrol et.");
  process.exit(1);
}

// AYAR: Aynı anda kaç içerik üretilecek?
const CONCURRENCY = 6; // 6 iyi bir başlangıç. Limit yemezsen 8'e çıkarabilirsin.

// JSON yolları
const topicsPath = path.join(__dirname, "..", "data", "topics.json");
const pagesPath = path.join(__dirname, "..", "data", "pages.generated.json");

// topics & mevcut sayfalar
const allTopics = JSON.parse(fs.readFileSync(topicsPath, "utf8"));
const existing = fs.existsSync(pagesPath)
  ? JSON.parse(fs.readFileSync(pagesPath, "utf8"))
  : [];

const existingSlugs = new Set(existing.map((p) => p.slug));

// Üretilecek olanlar (daha önce yazılmamış slug'lar)
const queue = allTopics.filter(
  (t) => t.slug && !existingSlugs.has(t.slug)
);

const systemPrompt = `
You are a writer for a website called "Inner Meaning".
Return only a JSON object with this exact shape:

{
  "slug": string,
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

async function generateForTopic(topic) {
  const userPrompt = `
Topic:
- slug: ${topic.slug}
- title: ${topic.title}
- category: ${topic.category}
- focus: ${topic.focus}

Generate the JSON now.
`;

  console.log(`✨ Generating: ${topic.slug}`);

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      "HTTP-Referer": "https://inner-meaning.com",
      "X-Title": "Inner Meaning Generator",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528-qwen3-8b",
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
    console.error(`❌ API error for ${topic.slug}:`, err);
    throw new Error("API error");
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    console.error("❌ API response has no content for:", topic.slug, data);
    throw new Error("Empty content");
  }

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    console.error("❌ JSON parse error. Raw content:", content);
    throw e;
  }

  // Aynı slug'ı bir daha yazma
  if (existingSlugs.has(parsed.slug)) {
    console.log(`⏩ Already exists, skipping in runtime: ${parsed.slug}`);
    return;
  }

  existing.push(parsed);
  existingSlugs.add(parsed.slug);

  // Her içeriği hemen diske yaz (kapanma / elektrik kesilmesine karşı güvenli)
  fs.writeFileSync(pagesPath, JSON.stringify(existing, null, 2));
  console.log(`✅ Saved: ${parsed.slug}`);
}

async function worker(workerId) {
  while (true) {
    // Kuyruktan bir topic çek
    const topic = queue.shift();
    if (!topic) {
      // İş kalmadı, worker çıkıyor
      return;
    }

    try {
      console.log(`👷 Worker ${workerId} started: ${topic.slug}`);
      await generateForTopic(topic);
    } catch (e) {
      console.error(`❌ Worker ${workerId} error on ${topic.slug}:`, e.message);
      // Hata olduğunda istersen tekrar deneme logic'i buraya ekleyebiliriz.
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
