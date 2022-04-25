import { createContext, useState } from "react";

export const SettingsContext = createContext({} as any);

interface SettingsContextProps {
  children: React.ReactNode;
}

const SettingsProvider = ({ children }: SettingsContextProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(30);
  const [breakMinutes, setBreakMinutes] = useState(5);

  return (
    <SettingsContext.Provider
      value={{
        showSettings,
        setShowSettings,
        workMinutes,
        setWorkMinutes,
        breakMinutes,
        setBreakMinutes,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
