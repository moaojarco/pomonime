import { useContext, useRef, useState } from "react";
import ReactSlider from "react-slider";
import { SettingsContext } from "../../contexts/SettingsContext";
import styles from "./Settings.module.scss";
import FlorkHm from "../../assets/flork1.png";
import FlorkOk from "../../assets/flork2.png";

export const Settings = () => {
  const {
    workMinutes,
    setWorkMinutes,
    breakMinutes,
    setBreakMinutes,
    setShowSettings,
  } = useContext(SettingsContext);

  const rightBoxRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.root}>
      <main className={styles["settings-box"]}>
        <div>
          <h1>Settings</h1>
          <label>Work Minutes: {`${workMinutes}:00`}</label>
          <ReactSlider
            className={styles.slider}
            thumbClassName={styles.thumb}
            trackClassName={styles.track}
            value={workMinutes}
            min={1}
            max={120}
            onChange={(e) => setWorkMinutes(e)}
          />
          <label>Break Minutes: {`${breakMinutes}:00`}</label>
          <ReactSlider
            className={`${styles.slider} ${styles.green}`}
            thumbClassName={styles.thumb}
            trackClassName={styles.track}
            value={breakMinutes}
            min={1}
            max={60}
            onChange={(e) => setBreakMinutes(e)}
          />
          <div style={{ marginTop: "30px" }}>
            <h2>Alarm Song</h2>
            <input list="alarm" name="alarm" placeholder="Soon..." disabled />
          </div>
          <div>
            <button
              onClick={() => {
                setShowSettings(false);
              }}
              className={styles.btn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
              </svg>
              Save
            </button>
          </div>
        </div>
        <div className={styles["right-box"]} ref={rightBoxRef}>
          {workMinutes < breakMinutes && (
            <div className={styles["flork-container"]}>
              <p>Do you want to rest more than work?</p>
              <img src={FlorkHm} className={styles["img-right"]} />
            </div>
          )}
          {workMinutes >= 25 && breakMinutes <= 10 && (
            <div className={styles["flork-container"]}>
              <p>Perfect!</p>
              <img src={FlorkOk} className={styles["img-right"]} />
            </div>
          )}
          {workMinutes >= 60 && breakMinutes <= 10 && (
            <div className={styles["flork-container"]}>
              <p>Are you sure?!</p>
              <img src={FlorkOk} className={styles["img-right"]} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
