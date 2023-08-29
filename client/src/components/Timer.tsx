import React from "react";
import { useState, useEffect } from "react";

interface TimerProps {
  initialTime: number;
}

function TimerLogic({ initialTime }: TimerProps) {
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
    if (time > 0) {
      setPaused(!paused);
    }
  };

  const handleReset = () => {
    setTime(initialTime);
    setPaused(true);
  };

  return { time, paused, handlePause, handleReset };
}

function TimerFormat(time: number) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time - hours * 3600) / 60);
  let seconds = time - hours * 3600 - minutes * 60;

  return { hours, minutes, seconds };
}

function Timer({ initialTime }: TimerProps) {
  const { time, paused, handlePause, handleReset } = TimerLogic({
    initialTime,
  });

  const { hours, minutes, seconds } = TimerFormat(time);

  return (
    <div>
      <h2>SkillTimer</h2>
      <p>
        {hours}:{minutes}:{seconds}
      </p>
      <button onClick={handlePause}>{paused ? "Resume" : "Pause"}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Timer;
