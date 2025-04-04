import { useDispatch, useSelector } from 'react-redux';
import { toggleLanguage } from '../../store/language.slice';
import i18n from 'i18next';
import './styles.css';

export const ToggleLang = () => {
  const dispatch = useDispatch();
  const { currentLang, toggled } = useSelector((state) => state.language);

  const handleLanguageChange = () => {
    dispatch(toggleLanguage());
    i18n.changeLanguage(currentLang === 'en' ? 'ru' : 'en');
  };

  return (
    <button
      className={`toggle-btn ${toggled ? 'toggled' : ''}`}
      onClick={handleLanguageChange}
    >
      <div className="thumb">{toggled ? 'Ru' : 'En'}</div>
    </button>
  );
};
