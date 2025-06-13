import { useLanguage } from '../../hooks/useLanguage';
import i18n from 'i18next';
import './styles.css';

export const ToggleLang = () => {
  const { lang, toggleLang } = useLanguage();

  const handleLanguageChange = () => {
    toggleLang();
    i18n.changeLanguage(lang === 'en' ? 'ru' : 'en');
  };

  return (
    <button
      className={`toggle-btn ${lang === 'ru' ? 'toggled' : ''}`}
      onClick={handleLanguageChange}
    >
      <div className="thumb">{lang === 'ru' ? 'Ру' : 'En'}</div>
    </button>
  );
};
