import React from "react";
import { useState, useEffect } from "react";

interface TimerProps {
  initialTime: number;
}

function Timer({ initialTime }: TimerProps) {
  const [time, setTime] = useState(initialTime);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      return;
    }

    let timer: NodeJS.Timeout;
    timer = setInterval(() => {
      setTime((time) => time - 1);

      if (time - 1 === 0) {
        setPaused(true);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [paused, time]);

  const handlePause = () => {
    setPaused(!paused);
  };

  const handleReset = () => {
    setTime(initialTime);
    setPaused(true);
  };

  return (
    <div>
      <h2>SkillTimer</h2>
      <p>Time: {time}</p>
      <button onClick={handlePause}>{paused ? "Resume" : "Pause"}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Timer;
