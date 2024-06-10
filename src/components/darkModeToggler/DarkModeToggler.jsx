import { useEffect, useRef } from "react";
import { useLocalStorage } from "../../utils/useLocalStorage";
import detectDarkMode from "../../utils/detectDarkMode";
import { WiDaySunny } from "react-icons/wi";
import { WiMoonWaningCrescent2 } from "react-icons/wi";
import "./style.css";

const DarkModeToggler = () => {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", detectDarkMode);

  const buttonRef = useRef(null);

  useEffect(() => {
    if (darkMode === "dark") {
      console.log(darkMode);
      document.body.classList.add("dark");
      buttonRef.current.classList.add("dark-mode-btn--active");
    } else {
      document.body.classList.remove("dark");
      buttonRef.current.classList.remove("dark-mode-btn--active");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((currentValue) => currentValue === "light" ? "dark" : "light");
  };

  return (
    <button ref={buttonRef} className="dark-mode-btn" onClick={toggleDarkMode}>
      <WiDaySunny className="dark-mode-btn__icon" />
      <WiMoonWaningCrescent2 className="dark-mode-btn__icon--moon" />
    </button>
  );
};

export default DarkModeToggler;
