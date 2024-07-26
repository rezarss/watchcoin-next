import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wheel } from "react-custom-roulette";
import WheelOfFortune from "@/app/components/WheelOfFortune";

const CoinClickerGame = () => {
  const [coins, setCoins] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [energy, setEnergy] = useState(5000);
  const [maxEnergy, setMaxEnergy] = useState(5000);
  const [showBoost, setShowBoost] = useState(false);
  const [wheelThreshold, setWheelThreshold] = useState(10);
  const [showWheel, setShowWheel] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [boosters, setBoosters] = useState({
    multitap: { level: 12, cost: 10 },
    energyLimit: { level: 15, cost: 10 },
    rechargingSpeed: { level: 1, cost: 10 },
  });

  const wheelData = [
    {
      option: "50 coins",
      style: { backgroundColor: "#ffc107", textColor: "black" },
    },
    {
      option: "100 coins",
      style: { backgroundColor: "#2196f3", textColor: "white" },
    },
    {
      option: "150 coins",
      style: { backgroundColor: "#4caf50", textColor: "white" },
    },
    {
      option: "200 coins",
      style: { backgroundColor: "#ff5722", textColor: "white" },
    },
    {
      option: "250 coins",
      style: { backgroundColor: "#9c27b0", textColor: "white" },
    },
    {
      option: "300 coins",
      style: { backgroundColor: "#ffeb3b", textColor: "black" },
    },
  ];

  const handleCoinClick = () => {
    if (energy > 0) {
      const newCoins = coins + clickPower;
      setCoins(newCoins);
      setEnergy((prevEnergy) => Math.max(prevEnergy - 1, 0));

      if (newCoins >= wheelThreshold) {
        setShowWheel(true);
      }
    }
  };

  // maybe unused below functions
  const handleUpgrade = (boosterType) => {
    const booster = boosters[boosterType];
    if (coins >= booster.cost) {
      setCoins((prevCoins) => prevCoins - booster.cost);
      setBoosters((prevBoosters) => ({
        ...prevBoosters,
        [boosterType]: {
          ...booster,
          level: booster.level + 1,
          cost: Math.floor(booster.cost * 1.5),
        },
      }));

      if (boosterType === "multitap") {
        setClickPower((prevPower) => prevPower * 2);
      } else if (boosterType === "energyLimit") {
        setMaxEnergy((prevMax) => prevMax * 1.5);
      }
    }
  };

  const calculateNextWheelThreshold = (currentThreshold) => {
    return Math.floor(currentThreshold * 1.8);
  };

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handleSpinStop = () => {
    setMustSpin(false);

    // اطمینان حاصل کنیم که prizeNumber یک عدد معتبر است
    if (prizeNumber >= 0 && prizeNumber < wheelData.length) {
      const prizeOption = wheelData[prizeNumber].option;

      // بررسی کنیم که option یک رشته معتبر است
      if (typeof prizeOption === "string") {
        // استخراج عدد از رشته
        const wonCoins = parseInt(prizeOption.match(/\d+/)[0]);

        // بررسی کنیم که wonCoins یک عدد معتبر است
        if (!isNaN(wonCoins)) {
          setCoins((prevCoins) => prevCoins + wonCoins);
          console.log(`Won ${wonCoins} coins!`);
        } else {
          console.error("Invalid coin value");
        }
      } else {
        console.error("Invalid prize option");
      }
    } else {
      console.error("Invalid prize number");
    }

    setShowWheel(false);
    setWheelThreshold(calculateNextWheelThreshold(wheelThreshold));
  };
  useEffect(() => {
    const energyRechargeInterval = setInterval(() => {
      setEnergy((prevEnergy) =>
        Math.min(prevEnergy + boosters.rechargingSpeed.level, maxEnergy),
      );
    }, 1000);

    return () => clearInterval(energyRechargeInterval);
  }, [maxEnergy, boosters.rechargingSpeed.level]);

  const MainScreen = () => {
    const handleWheelFinished = async (winner) => {
      alert(`Congratulations! You won ${winner.option}!`);
      setShowWheel(false);
      const newCoins = coins + parseInt(winner.option.split(" ")[0], 10);
      setCoins(newCoins);
      // setNextSpin(nextSpin + 10);
      // // به‌روزرسانی داده‌های کاربر در API
      // await fetch("/api/coins", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     userId: "user123",
      //     coins: newCoins,
      //     nextSpin: nextSpin + 10,
      //   }),
      // });
    };

    return (
      <>
        <div className="w-full mb-4">
          <h1 className="text-3xl font-bold text-center mb-2">WatchCoin</h1>
          <h2>Env Test: {process.env.NEXT_PUBLIC_SOMETEXT}</h2>
          <div className="flex justify-center items-center mb-2">
            <span className="text-4xl font-bold">{coins.toLocaleString()}</span>
          </div>
        </div>

        <motion.button
          onClick={handleCoinClick}
          className="bg-yellow-400 hover:bg-yellow-500 w-60 h-60 rounded-full mb-8 shadow-lg focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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

        <div className="w-full mb-4">
          <div className="flex justify-between items-center mb-2">
            <span>
              ⚡ {energy}/{maxEnergy}
            </span>
            <span>
              🎡 {Math.max(0, wheelThreshold - coins)} coins until Wheel of
              Fortune
            </span>
          </div>
          <div className="bg-blue-900 rounded-full h-4">
            <div
              className="bg-blue-500 rounded-full h-4"
              style={{ width: `${(energy / maxEnergy) * 100}%` }}
            ></div>
          </div>
        </div>

        {showWheel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg text-black">
              <h2 className="text-2xl font-bold mb-4">Wheel of Fortune</h2>
              <WheelOfFortune onFinished={handleWheelFinished} />
            </div>
          </div>
        )}
      </>
    );
  };

  const BoostScreen = () => (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Boosters:</h2>
      {Object.entries(boosters).map(([key, booster]) => (
        <motion.button
          key={key}
          onClick={() => handleUpgrade(key)}
          className="w-full bg-gray-800 text-left p-3 rounded-lg mb-2 flex justify-between items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          <span>
            {booster.level} level | {booster.cost.toLocaleString()} coins
          </span>
        </motion.button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-purple-900 to-purple-600 text-white p-4">
      {showBoost ? <BoostScreen /> : <MainScreen />}

      <div className="flex justify-between w-full mt-4">
        {["Ref", "Task", "Tap", "Boost", "Stats"].map((item) => (
          <motion.button
            key={item}
            className={`bg-gray-800 p-2 rounded-lg ${item === (showBoost ? "Boost" : "Tap") ? "bg-yellow-500" : ""}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => (item === "Boost" ? setShowBoost(!showBoost) : null)}
          >
            {item}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CoinClickerGame;
