import { createContext, useState } from "react";

export const SettingsContext = createContext({} as any);

interface SettingsContextProps {
  children: React.ReactNode;
}

const SettingsProvider = ({ children }: SettingsContextProps) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <SettingsContext.Provider value={{ showSettings, setShowSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
