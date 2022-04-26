import styles from "./Timer.module.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PlayButton, PauseButton, SettingsButton } from "..";
import { useContext, useEffect, useRef, useState } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";

const red = "#ff7168";
const green = "#36c590";

export const Timer = () => {
  const settingsInfo = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [mode, setMode] = useState<string>("work"); // "work" or "break"
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function initTimer() {
    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
  }

  function switchMode() {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    const nextSeconds =
      nextMode === "work"
        ? settingsInfo.workMinutes
        : settingsInfo.breakMinutes * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  function tick() {
    secondsLeftRef.current -= 1;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (isPausedRef.current) return;

      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;

  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds: string | number = secondsLeft % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return (
    <div className={styles.root}>
      <CircularProgressbar
        value={percentage}
        text={`${minutes < 10 ? `0${minutes}` : `${minutes}`}:${seconds}`}
        styles={buildStyles({
          textColor: "#222",
          pathColor: mode === "work" ? red : green,
          trailColor: "rgba(255, 255, 255, .2)",
        })}
      />
      <div className={styles["buttons-container"]}>
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
      <div
        onClick={() => settingsInfo.setShowSettings(true)}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <SettingsButton />
      </div>
    </div>
  );
};
