// scripts/generate-pages.cjs
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.OPENROUTER_API_KEY;
if (!API_KEY) {
  console.error("❌ OPENROUTER_API_KEY bulunamadı. .env dosyanı kontrol et.");
  process.exit(1);
}

// JSON yolları
const topicsPath = path.join(__dirname, "..", "data", "topics.json");
const pagesPath = path.join(__dirname, "..", "data", "pages.generated.json");

// topics & mevcut sayfalar
const topics = JSON.parse(fs.readFileSync(topicsPath, "utf8"));
const existing = fs.existsSync(pagesPath)
  ? JSON.parse(fs.readFileSync(pagesPath, "utf8"))
  : [];

const existingSlugs = new Set(existing.map((p) => p.slug));

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

// Küçük yardımcı: bekleme (rate limit için)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generateForTopic(topic) {
  const userPrompt = `
Topic:
- slug: ${topic.slug}
- title: ${topic.title}
- category: ${topic.category}
- focus (TR): ${topic.focus}

Generate the JSON now.
`;

  console.log(`\n✨ Generating: ${topic.slug}`);

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
    console.error("❌ API error:", err);
    throw new Error("API error");
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    console.error("❌ API response has no content:", data);
    throw new Error("Empty content");
  }

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    console.error("❌ JSON parse error. Raw content:", content);
    throw e;
  }

  // Sayfayı listeye ekle & dosyaya yaz
  existing.push(parsed);
  fs.writeFileSync(pagesPath, JSON.stringify(existing, null, 2));
  console.log(`✅ Saved: ${topic.slug}`);
}

async function main() {
  const remaining = topics.filter((t) => !existingSlugs.has(t.slug));
  console.log(`\n📚 Toplam topic: ${topics.length}`);
  console.log(`✅ Zaten üretilen: ${existing.length}`);
  console.log(`🚀 Üretilecek yeni: ${remaining.length}`);

  for (const topic of remaining) {
    try {
      await generateForTopic(topic);
      // ufak delay → limit yemeyelim
      await sleep(1500);
    } catch (e) {
      console.error("❌ Hata, bu topic atlandı:", topic.slug);
      console.error(e);
    }
  }

  console.log("\n🎉 BİTTİ! Tüm yeni sayfalar pages.generated.json içine yazıldı.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
