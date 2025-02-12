import { createContext, useContext, useEffect, useState } from "react";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon } from "react-icons/hi2";

const darkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDark") === "true"
  );

  useEffect(
    function () {
      if (isDarkMode) {
        localStorage.setItem("isDark", true);
        document.documentElement.classList.remove("light-mode");
        document.documentElement.classList.add("dark-mode");
      } else {
        localStorage.setItem("isDark", false);
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
      }
    },
    [isDarkMode]
  );
  function toggleDarkMode() {
    setIsDarkMode((state) => !state);
  }

  return (
    <darkModeContext.Provider value={{ toggleDarkMode, isDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
}

function useDarkModeContext() {
  const context = useContext(darkModeContext);
  if (context === undefined) {
    throw new Error("dark mode context was used outside its provider ");
  }

  return context;
}

function DarkModeToggle() {
  const { toggleDarkMode } = useDarkModeContext();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      <HiOutlineMoon />
    </ButtonIcon>
  );
}

export { useDarkModeContext, DarkModeProvider, DarkModeToggle };
