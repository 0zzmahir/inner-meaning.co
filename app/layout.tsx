import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inner Meaning",
  description: "A calm meaning library.",
  verification: {
    google: "FLcRRJLdzdFBb2tvDxWnGkbAIJ654F_wp5mAzTOyjqk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* AdSense domain doğrulama meta etiketi */}
        <meta
          name="google-adsense-account"
          content="ca-pub-8097019883190912"
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-E8XCC2PGDX"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E8XCC2PGDX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Google AdSense (global) */}
        <Script
          id="adsbygoogle-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8097019883190912"
          crossOrigin="anonymous"
        />
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
