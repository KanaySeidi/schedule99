import React, { useState, useEffect } from "react";

function CityTime({ city, timeZoneOffset }) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const calculateTime = () => {
      const localTime = new Date();
      const timeZoneOffsetMs = timeZoneOffset * 60 * 1000;
      const cityTime = new Date(localTime.getTime() + timeZoneOffsetMs);
      setCurrentTime(cityTime.toLocaleTimeString());
    };

    const intervalId = setInterval(calculateTime, 1000);

    calculateTime();

    return () => clearInterval(intervalId);
  }, [timeZoneOffset]);

  return (
    <div
      style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}
    >
      <div>Текущее время в Бишкеке:</div>
      <div>{currentTime}</div>
    </div>
  );
}

export default CityTime;
