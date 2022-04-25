import { useContext, useState } from "react";
import ReactSlider from "react-slider";
import { SettingsContext } from "../../contexts/SettingsContext";
import styles from "./Settings.module.scss";

export const Settings = () => {
  const [initial, setInitial] = useState("");
  const { setShowSettings } = useContext(SettingsContext);

  return (
    <div className={styles.root}>
      <h1>Settings</h1>
      <label>Work Minutes: </label>
      <ReactSlider
        className={styles.slider}
        thumbClassName={styles.thumb}
        trackClassName={styles.track}
        value={45}
        min={1}
        max={120}
      />
      <label>Break Minutes: </label>
      <ReactSlider
        className={`${styles.slider} ${styles.green}`}
        thumbClassName={styles.thumb}
        trackClassName={styles.track}
        value={25}
        min={1}
        max={120}
      />
      <div>
        <button onClick={() => setShowSettings(false)} className={styles.btn}>
          Save
        </button>
      </div>
    </div>
  );
};
