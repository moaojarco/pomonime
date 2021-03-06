import { useContext, useState } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import styles from "./Settings.module.scss";

export const Settings = () => {
  const {
    setWorkMinutes,
    setBreakMinutes,
    setShowSettings,
    timerColor,
    setTimerColor,
    setBackground,
  } = useContext(SettingsContext);

  const [file, setFile] = useState<any>();
  const fReader = new FileReader();

  return (
    <div className={styles.root}>
      <main className={styles["settings-box"]}>
        <div>
          <h1>Timer Settings</h1>
          <div style={{ display: "flex" }}>
            <div>
              <label>Work Minutes</label>
              <input
                className={styles["input-base"]}
                type="number"
                placeholder={`${window.localStorage.getItem("workMinutes")}`}
                onChange={(e) => {
                  setWorkMinutes(e.target.value);
                  window.localStorage.setItem("workMinutes", e.target.value);
                }}
              />
            </div>
            <div style={{ marginLeft: "5rem" }}>
              <label>Break Minutes</label>
              <input
                className={styles["input-base"]}
                type="number"
                placeholder={`${window.localStorage.getItem("breakMinutes")}`}
                onChange={(e) => {
                  setBreakMinutes(e.target.value);
                  window.localStorage.setItem("breakMinutes", e.target.value);
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <h1>Colors</h1>
            <div className={styles.colorspicker}>
              <div>
                <h2>Work</h2>
                <input
                  type="color"
                  value={timerColor.workColor}
                  onChange={(e) => {
                    window.localStorage.setItem("workColor", e.target.value);
                    setTimerColor({ ...timerColor, workColor: e.target.value });
                  }}
                />
              </div>
              <div>
                <h2>Break</h2>
                <input
                  type="color"
                  value={timerColor.breakColor}
                  onChange={(e) => {
                    window.localStorage.setItem("breakColor", e.target.value);
                    setTimerColor(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <h1>Background</h1>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                setShowSettings(false);
                  fReader.onload = () => {
                    setBackground(fReader.result);
                      window.localStorage.setItem("background", fReader.result as string) 
                  };
                  fReader.readAsDataURL(file);
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
      </main>
    </div>
  );
};
