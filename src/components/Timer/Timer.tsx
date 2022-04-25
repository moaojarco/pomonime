import styles from "./Timer.module.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PlayButton, PauseButton, SettingsButton } from "..";
import { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";

const red = "#f54e4e";
const green = "#4aec8c";

export const Timer = () => {
  const { showSettings, setShowSettings } = useContext(SettingsContext);

  return (
    <div className={styles.root}>
      <CircularProgressbar
        value={60}
        text={`60%`}
        styles={buildStyles({
          textColor: "#FFF",
          pathColor: red,
          trailColor: "rgba(255, 255, 255, .2)",
        })}
      />
      <div className={styles["buttons-container"]}>
        <PlayButton />
        <PauseButton />
      </div>
      <div
        onClick={() => setShowSettings(true)}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <SettingsButton />
      </div>
    </div>
  );
};
