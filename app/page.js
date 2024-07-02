"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import CoinClickerGame from "./components/CoinClickerGame";

export default function Home() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready();
      setUserId(webApp.initDataUnsafe?.user?.id);
    }
  }, []);
  return (
    <main>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
      <h1 className="text-4xl font-bold mb-8">Telegram Mini App</h1>
      {userId ? (
        <p className="text-xl">شناسه کاربر شما: {userId} تمام</p>
      ) : (
        <p className="text-xl">Loading...!!</p>
      )}
      <CoinClickerGame />
    </main>
  );
}
