import fs from "fs";

const INPUT_FILE = "./data/pages.generated.json";
const OUTPUT_FILE = "./data/pages.generated.deduped.json";

function normalizeTitle(title = "") {
  return String(title)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function contentScore(p) {
  const parts = [
    p.intro || "",
    p.meaning || "",
    p.spiritual || "",
    p.psychological || "",
    p.advice || "",
  ];
  return parts.join(" ").length;
}

const raw = fs.readFileSync(INPUT_FILE, "utf8");
const pages = JSON.parse(raw);

console.log("Önce toplam sayfa:", pages.length);

const groups = new Map();

// 1) Aynı konuya ait tüm entry'leri grupla
for (const p of pages) {
  const slug = (p.slug || "").toLowerCase().trim();
  const normTitle = normalizeTitle(p.title);
  const key = slug || normTitle; // slug varsa ona göre, yoksa title'a göre grupla

  if (!key) continue;

  if (!groups.has(key)) {
    groups.set(key, []);
  }
  groups.get(key).push(p);
}

const deduped = [];

for (const [key, list] of groups.entries()) {
  if (list.length === 1) {
    deduped.push(list[0]);
    continue;
  }

  // Aynı konu birden çok kez yazılmış -> en dolu olanı seç
  let best = list[0];
  let bestScore = contentScore(best);

  for (let i = 1; i < list.length; i++) {
    const s = contentScore(list[i]);
    if (s > bestScore) {
      best = list[i];
      bestScore = s;
    }
  }

  deduped.push(best);
}

console.log("Sonra toplam sayfa:", deduped.length);
console.log("Silinen duplicate sayfa:", pages.length - deduped.length);

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(deduped, null, 2), "utf8");

console.log("Bitti! Yeni dosya:", OUTPUT_FILE);
