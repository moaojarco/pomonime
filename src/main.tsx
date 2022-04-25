import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SettingsProvider from "./contexts/SettingsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>
);
