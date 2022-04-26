import { Settings, Timer } from "./components";
import styles from "./App.module.scss";
import { useContext, useEffect } from "react";
import { SettingsContext } from "./contexts/SettingsContext";

function App() {
  const { showSettings } = useContext(SettingsContext);

  return (
    <div className={styles.root}>
      <div className={styles.overlay}>
        {showSettings ? <Settings /> : <Timer />}
      </div>
    </div>
  );
}

export default App;
