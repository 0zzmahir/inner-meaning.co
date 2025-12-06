import fs from "fs";

// 1) Dosya adı – sen hangisini kullanıyorsan ona göre değiştir
const INPUT_FILE = "./data/pages.generated.json";          // orijinal
const OUTPUT_FILE = "./data/pages.generated.fixed.json"; // yeni çıkacak dosya

function slugifyFromTitle(title) {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")           // rubik’s -> rubiks
    .replace(/[^a-z0-9]+/g, "-")    // boşluk + diğer her şey -> -
    .replace(/^-+|-+$/g, "");       // baş/son tireleri temizle
}

const raw = fs.readFileSync(INPUT_FILE, "utf8");
const topics = JSON.parse(raw);

console.log("Toplam topic:", topics.length);

for (const t of topics) {
  if (!t.title) continue;
  const oldSlug = t.slug;
  const newSlug = slugifyFromTitle(t.title);

  t.slug = newSlug;

  // İstersen loglamak için:
  // if (oldSlug !== newSlug) {
  //   console.log(`${oldSlug} -> ${newSlug}`);
  // }
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(topics, null, 2), "utf8");

console.log("Bitti! Yeni dosya:", OUTPUT_FILE);
