import { Settings, Timer } from "./components";
import styles from "./App.module.scss";
import { useContext } from "react";
import { SettingsContext } from "./contexts/SettingsContext";

function App() {
  const { showSettings } = useContext(SettingsContext);

  return (
    <div className={styles.root}>{showSettings ? <Settings /> : <Timer />}</div>
  );
}

export default App;
