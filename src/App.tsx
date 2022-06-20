import { Settings, Timer } from "./components";
import styles from "./App.module.scss";
import { useContext, useState } from "react";
import { SettingsContext } from "./contexts/SettingsContext";

function App() {
  const { showSettings, background } = useContext(SettingsContext);
  const [cachedBackground] = useState(window.localStorage.getItem("background"));

  return (
    <div
      className={styles.root}
      style={{ background: `url(${cachedBackground ? cachedBackground : background}) no-repeat center` }}
    >
      <div className={styles.overlay}>
        {showSettings ? <Settings /> : <Timer />}
      </div>
    </div>
  );
}

export default App;
