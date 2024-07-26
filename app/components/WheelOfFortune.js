// components/WheelOfFortune.js
import React from "react";
import { Wheel } from "react-custom-roulette";

// wheel data
const data = [
  {
    option: "10 Coins",
    style: { backgroundColor: "#f54242", textColor: "white" },
  },
  {
    option: "20 Coins",
    style: { backgroundColor: "#42f554", textColor: "white" },
  },
  {
    option: "50 Coins",
    style: { backgroundColor: "#4287f5", textColor: "white" },
  },
  {
    option: "100 Coins",
    style: { backgroundColor: "#f5a742", textColor: "white" },
  },
  {
    option: "200 Coins",
    style: { backgroundColor: "#f542d4", textColor: "white" },
  },
];

const WheelOfFortune = ({ onFinished }) => {
  const [mustSpin, setMustSpin] = React.useState(false);
  const [prizeNumber, setPrizeNumber] = React.useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={["#3e3e3e", "#df3428"]}
        textColors={["#ffffff"]}
        onStopSpinning={() => {
          setMustSpin(false);
          onFinished(data[prizeNumber]);
        }}
      />
      <button className="bg-slate-100 rounded p-2" onClick={handleSpinClick}>
        Spin
      </button>
    </div>
  );
};

export default WheelOfFortune;
