// scripts/generate-pages.cjs

const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  console.error("❌ OPENROUTER_API_KEY bulunamadı.");
  process.exit(1);
}

// ULTRA MODE: aynı anda 20 istek
const MAX_CONCURRENCY = 20;

// Seçtiğimiz model
const MODEL_ID = "deepseek/deepseek-r1-0528-qwen3-8b";

const topicsPath = path.join(process.cwd(), "data", "topics.json");
const pagesPath = path.join(process.cwd(), "data", "pages.generated.json");

// topic ve mevcut sayfaları oku
const topics = JSON.parse(fs.readFileSync(topicsPath, "utf-8"));

let existing = [];
if (fs.existsSync(pagesPath)) {
  try {
    existing = JSON.parse(fs.readFileSync(pagesPath, "utf-8"));
  } catch {
    existing = [];
  }
}

async function generate(topic) {
  const body = {
    model: MODEL_ID,
    messages: [
      {
        role: "system",
        content: `Return ONLY a JSON object with this shape:
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
Write around 700-900 words. Do NOT add anything else outside the JSON.`
      },
      {
        role: "user",
        content: `
slug: ${topic.slug}
title: ${topic.title}
category: ${topic.category}
focus (TR): ${topic.focus}
        `
      }
    ],
    temperature: 0.7,
    response_format: { type: "json_object" }
  };

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  if (!res.ok || !data.choices || !data.choices[0]) {
    console.error("🔴 OpenRouter API HATASI:", JSON.stringify(data, null, 2));
    throw new Error("OpenRouter API error");
  }

  const content = data.choices[0].message.content;
  return JSON.parse(content);
}

(async () => {
  console.log("🚀 Toplam topic:", topics.length);
  let pages = [...existing];

  // index pointer + worker havuzu
  let index = 0;

  async function worker(id) {
    while (true) {
      let i = index;
      if (i >= topics.length) break;
      index++;

      const topic = topics[i];

      if (pages.some((p) => p.slug === topic.slug)) {
        console.log(`⏭ [W${id}] ZATEN VAR: ${topic.slug}`);
        continue;
      }

      console.log(`✏️ [W${id}] ÜRETİLİYOR: ${topic.slug}`);

      try {
        const page = await generate(topic);
        pages.push(page);

        // ara ara diske yaz (her yeni sayfada)
        fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2));
        console.log(`✅ [W${id}] EKLENDİ: ${topic.slug}`);
      } catch (err) {
        console.error(`❌ [W${id}] HATA: ${topic.slug}`, err.message);
      }
    }
  }

  // MAX_CONCURRENCY kadar worker başlat
  const workers = [];
  for (let w = 1; w <= MAX_CONCURRENCY; w++) {
    workers.push(worker(w));
  }

  await Promise.all(workers);

  console.log("🎉 BİTTİ! TOPLAM SAYFA:", pages.length);
})();
