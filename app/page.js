"use client";
import dynamic from "next/dynamic";
import Script from "next/script";

// لود کردن CoinClickerGame فقط در سمت کلاینت
const CoinClickerGame = dynamic(() => import("./components/CoinClickerGame"), {
  ssr: false,
});

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
