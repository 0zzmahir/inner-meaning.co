"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

type Props = {
  slot: string;
  className?: string;
};

export function AdsenseBlock({ slot, className }: Props) {
  const disableAds = process.env.NEXT_PUBLIC_DISABLE_ADS === "true";

  useEffect(() => {
    if (disableAds) return; // Geçici olarak push çalışmasın
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [disableAds]);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{
          display: disableAds ? "none" : "block",   // Google DOM’da görecek ama kullanıcı görmeyecek
        }}
        data-ad-client="ca-pub-8097019883190912"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
