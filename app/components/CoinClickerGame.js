import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CoinClickerGame = () => {
  const [coins, setCoins] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [upgradeCost, setUpgradeCost] = useState(10);
  const [coinScale, setCoinScale] = useState(1);

  const handleCoinClick = () => {
    setCoins((prevCoins) => prevCoins + clickPower);
    setCoinScale(0.9);
    setTimeout(() => setCoinScale(1), 100);
  };

  const handleUpgrade = () => {
    if (coins >= upgradeCost) {
      setCoins((prevCoins) => prevCoins - upgradeCost);
      setClickPower((prevPower) => prevPower + 1);
      setUpgradeCost((prevCost) => Math.floor(prevCost * 1.5));
    }
  };

  useEffect(() => {
    const savedCoins = localStorage.getItem("coins");
    const savedClickPower = localStorage.getItem("clickPower");
    const savedUpgradeCost = localStorage.getItem("upgradeCost");

    if (savedCoins) setCoins(parseInt(savedCoins));
    if (savedClickPower) setClickPower(parseInt(savedClickPower));
    if (savedUpgradeCost) setUpgradeCost(parseInt(savedUpgradeCost));
  }, []);

  useEffect(() => {
    localStorage.setItem("coins", coins.toString());
    localStorage.setItem("clickPower", clickPower.toString());
    localStorage.setItem("upgradeCost", upgradeCost.toString());
  }, [coins, clickPower, upgradeCost]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-8 text-yellow-300 drop-shadow-lg">
        بازی کلیکر سکه
      </h1>
      <div className="text-3xl mb-4 bg-black bg-opacity-30 px-4 py-2 rounded-full">
        سکه‌ها: {coins}
      </div>
      <motion.button
        onClick={handleCoinClick}
        className="bg-yellow-400 hover:bg-yellow-500 w-40 h-40 rounded-full mb-8 shadow-lg focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: coinScale }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full text-yellow-600"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
        </motion.svg>
      </motion.button>
      <div className="text-xl mb-4 bg-black bg-opacity-30 px-4 py-2 rounded-full">
        قدرت کلیک: {clickPower}
      </div>
      <motion.button
        onClick={handleUpgrade}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={coins < upgradeCost}
      >
        ارتقا ({upgradeCost} سکه)
      </motion.button>
    </div>
  );
};

export default CoinClickerGame;
