import { createContext, useState } from "react";
import alarm from "../assets/audios/wow.mp3";

export const SettingsContext = createContext({} as any);

interface SettingsContextProps {
  children: React.ReactNode;
}

const SettingsProvider = ({ children }: SettingsContextProps) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [workMinutes, setWorkMinutes] = useState<number>(25);
  const [breakMinutes, setBreakMinutes] = useState<number>(5);

  const [alarmSelected, setAlarmSelected] = useState<string>(alarm);

  return (
    <SettingsContext.Provider
      value={{
        showSettings,
        setShowSettings,
        workMinutes,
        setWorkMinutes,
        breakMinutes,
        setBreakMinutes,
        alarmSelected,
        setAlarmSelected,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
