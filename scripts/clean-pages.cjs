const fs = require("fs");
const crypto = require("crypto");

const pages = require("../data/pages.generated.json");

function textLength(p) {
  return (
    (p.intro?.length || 0) +
    (p.meaning?.length || 0) +
    (p.spiritual?.length || 0) +
    (p.psychological?.length || 0)
  );
}

function hashContent(p) {
  const str = `${p.title}|${p.meaning || ""}`;
  return crypto.createHash("md5").update(str).digest("hex");
}

const seenSlugs = new Set();
const seenHashes = new Set();

const cleaned = [];

for (const p of pages) {
  if (!p.slug || typeof p.slug !== "string") continue;
  if (!p.title || p.title.length < 5) continue;

  if (textLength(p) < 800) continue;

  if (seenSlugs.has(p.slug)) continue;
  seenSlugs.add(p.slug);

  const hash = hashContent(p);
  if (seenHashes.has(hash)) continue;
  seenHashes.add(hash);

  cleaned.push(p);
}

fs.writeFileSync(
  "./data/pages.cleaned.json",
  JSON.stringify(cleaned, null, 2)
);

console.log(`✅ Temizlenen sayfa sayısı: ${cleaned.length}`);
console.log(`❌ Silinen sayfa sayısı: ${pages.length - cleaned.length}`);
