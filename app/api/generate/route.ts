import { NextResponse } from "next/server";
import pages from "@/data/pages.generated.json";
import topics from "@/data/topics.json";

const apiKey = process.env.OPENAI_API_KEY!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const topic = topics.find((t) => t.slug === slug);

  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

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
Keep total length around 700-900 words.
Do NOT wrap in backticks.
`;

  const userPrompt = `
Topic:
- slug: ${topic.slug}
- title: ${topic.title}
- category: ${topic.category}
- focus (TR): ${topic.focus}

Generate the JSON now.
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    }),
  });

  const data = await res.json();
  const json = data.choices[0].message.content;

  // mevcut sayfaları al
  const existing = pages as any[];

  // yeni sayfayı ekle
  const updated = [...existing, JSON.parse(json)];

  // dosyaya yaz
  const fs = require("fs");
  fs.writeFileSync(
    "./data/pages.generated.json",
    JSON.stringify(updated, null, 2)
  );

  return NextResponse.json({ success: true, added: topic.slug });
}
