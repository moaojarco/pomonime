import { createContext, useState } from "react";
import alarm from "../assets/audios/wow.mp3";

export const SettingsContext = createContext({} as any);

interface SettingsContextProps {
  children: React.ReactNode;
}

type timerColor = {
  workColor: string;
  breakColor: string;
};

const SettingsProvider = ({ children }: SettingsContextProps) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [workMinutes, setWorkMinutes] = useState<number>(25);
  const [breakMinutes, setBreakMinutes] = useState<number>(5);
  const [timerColor, setTimerColor] = useState<timerColor>({
    workColor: "#689dff",
    breakColor: "#36c590",
  });
  const [background, setBackground] = useState<string>(""); 

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
        timerColor,
        setTimerColor,
        background,
        setBackground
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
