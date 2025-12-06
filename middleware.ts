// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// İzin verilecek "iyi botlar" (Google, Bing vs.)
const GOOD_BOTS = [
  "Googlebot",
  "Google-InspectionTool",
  "AdsBot",
  "Bingbot",
  "DuckDuckBot",
  "YandexBot",
  "Baiduspider",
];

// Kötü / şüpheli User-Agent pattern’leri
const BAD_UA_PATTERNS = [
  "MJ12bot",
  "python",
  "curl",
  "wget",
  "Go-http-client",
  "Nexus 5X", // Cloudflare’de gördüğün şüpheli UA
];

// Saldırı / scraping için sık kullanılan ASN’ler
// (Vercel header: x-vercel-ip-asn → genelde sayı olarak gelir)
const BAD_ASNS = [
  "16276", // OVH
  "14061", // DigitalOcean
  "51167", // Contabo (isteğe bağlı, istersen silebilirsin)
];

function isGoodBot(ua: string): boolean {
  return GOOD_BOTS.some((b) => ua.includes(b));
}

function isBadUA(ua: string): boolean {
  const lower = ua.toLowerCase();
  return BAD_UA_PATTERNS.some((b) => lower.includes(b.toLowerCase()));
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;
  const ua = req.headers.get("user-agent") || "";
  const asn = (req.headers.get("x-vercel-ip-asn") || "").trim();

  // 0) Robots / sitemap gibi şeylere dokunma
  if (
    path === "/robots.txt" ||
    path === "/sitemap.xml" ||
    path.startsWith("/sitemap")
  ) {
    return NextResponse.next();
  }

  // 1) WordPress brute-force / tarama isteklerini tamamen blokla
  if (path.startsWith("/wp-admin")) {
    return new NextResponse("WP Block", { status: 403 });
  }

  // 2) ASN bazlı kaba filtre (OVH / DigitalOcean / Contabo)
  if (asn && BAD_ASNS.includes(asn)) {
    // İyi bot ise (Google vs.) yine de izin ver
    if (!isGoodBot(ua)) {
      return new NextResponse("Bad ASN Block", { status: 403 });
    }
  }

  // 3) Static chunk isteklerinde şüpheli UA’ları blokla
  if (path.includes("/_next/static/chunks/")) {
    // Normal browser → "Mozilla" içerir
    const looksLikeBrowser = ua.includes("Mozilla");

    if (isBadUA(ua) && !isGoodBot(ua)) {
      return new NextResponse("Blocked Bot (Chunks)", { status: 403 });
    }

    // UA yoksa ve bot değilse → yüksek ihtimalle script → blok
    if (!ua && !isGoodBot(ua)) {
      return new NextResponse("Blocked (No UA)", { status: 403 });
    }

    // İyi bot veya normal browser ise → geç
    if (looksLikeBrowser || isGoodBot(ua)) {
      return NextResponse.next();
    }
  }

  // 4) Genel kötü UA’ları tüm site için hafifçe süz
  if (isBadUA(ua) && !isGoodBot(ua)) {
    return new NextResponse("Blocked Bad UA", { status: 403 });
  }

  // Her şey temiz ise devam
  return NextResponse.next();
}

// Hangi path’lerde çalışacağı
export const config = {
  matcher: [
    // Tüm sayfalar
    "/((?!_next/image|_next/font|favicon.ico).*)",
    // Chunk koruması için ayrıca:
    "/_next/static/chunks/:path*",
    "/wp-admin/:path*",
  ],
};
