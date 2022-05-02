import styles from "./Timer.module.scss";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PauseButton, PlayButton, SettingsButton } from "..";
import { useContext, useEffect, useRef, useState } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";

export const Timer = () => {
  const settingsInfo = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [mode, setMode] = useState<string>("work"); // "work" or "break"
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

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

  function initTimer() {
    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
  }

  function switchMode() {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    const nextSeconds =
      nextMode === "work"
        ? settingsInfo.workMinutes * 60
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
    document.title = `Pomonime - ${minutes}:${seconds} [${mode}]`;
  }, [minutes, seconds]);

  useEffect(() => {
    const localWorkMinutes = window.localStorage.getItem("workMinutes");
    const localBreakMinutes = window.localStorage.getItem("breakMinutes");

    const localWorkColor = window.localStorage.getItem("workColor");
    const localBreakColor = window.localStorage.getItem("breakColor");

    settingsInfo.setTimerColor({
      workColor: localWorkColor ? localWorkColor : "#689dff",
      breakColor: localBreakColor ? localBreakColor : "#36c590",
    });
    settingsInfo.setWorkMinutes(
      localWorkMinutes ? Number(localWorkMinutes) : 25
    );
    settingsInfo.setBreakMinutes(
      localBreakMinutes ? Number(localBreakMinutes) : 5
    );
  }, []);

  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (isPausedRef.current) return;

      if (secondsLeftRef.current === 0) {
        const audio = new Audio(settingsInfo.alarmSelected);
        audio.volume = 0.2;
        audio.muted = false;
        audio.play();
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.timer}>
          <CircularProgressbar
            value={percentage}
            text={`${minutes < 10 ? `0${minutes}` : `${minutes}`}:${seconds}`}
            styles={buildStyles({
              textColor: "#eee",
              pathColor:
                mode === "work"
                  ? settingsInfo.timerColor.workColor
                  : settingsInfo.timerColor.breakColor,
              trailColor: "rgba(255, 255, 255, .2)",
            })}
          />
          <p>{mode === "work" ? "Stay Focused" : "Relax"}</p>
        </div>
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
          <SettingsButton
            onClick={() => {
              settingsInfo.setShowSettings(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};
