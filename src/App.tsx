import { Settings, Timer } from "./components";
import styles from "./App.module.scss";
import { useState } from "react";

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={styles.root}>{showSettings ? <Settings /> : <Timer />}</div>
  );
}

export default App;
