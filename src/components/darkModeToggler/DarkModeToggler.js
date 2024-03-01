import { useEffect, useRef } from 'react';
import { useLocalStorage } from '../../utils/useLocalStorage';
import detectDarkMode from '../../utils/detectDarkMode';
import sun from '../../assets/svg/sun.svg';
import moon from '../../assets/svg/moon.svg';
import './style.css';

const DarkModeToggler = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', detectDarkMode);

  const buttonRef = useRef(null);

  useEffect(() => {
    if (darkMode === 'dark') {
      document.body.classList.add('dark');
      buttonRef.current.classList.add('dark-mode-btn--active');
    } else {
      document.body.classList.remove('dark');
      buttonRef.current.classList.remove('dark-mode-btn--active');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(currentValue => {
      return currentValue === 'light'
        ? 'dark'
        : 'light'
    });
  }

  return (
    <button ref={buttonRef} className="dark-mode-btn" onClick={toggleDarkMode}>
      <img src={sun} alt="Light mode" className="dark-mode-btn__icon" />
      <img src={moon} alt="Dark mode" className="dark-mode-btn__icon" />
    </button>
  )
}

export default DarkModeToggler;