"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import CoinClickerGame from "./components/CoinClickerGame";

export default function Home() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const webApp = window.Telegram?.WebApp;
      if (webApp) {
        webApp.ready();
        setUserId(webApp.initDataUnsafe?.user?.id);
      }
    }
  }, []);

  return (
    <main>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
      <CoinClickerGame />
    </main>
  );
}
