import { useLanguage } from '../../hooks/useLanguage';
import i18n from 'i18next';
import './styles.css';

const ToggleLang = ({ className = '' }) => {
  const { lang, toggleLang } = useLanguage();

  const handleLanguageChange = () => {
    toggleLang();
    i18n.changeLanguage(lang === 'en' ? 'ru' : 'en');
  };

  return (
    <button
      type="button"
      className={`toggle-btn ${className} ${lang === 'ru' ? '' : 'toggled'}`}
      onClick={handleLanguageChange}
    >
      <div className="thumb">{lang === 'ru' ? 'Ру' : 'En'}</div>
    </button>
  );
};

export default ToggleLang;
