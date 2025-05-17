// import i18n from 'i18next';
import './styles.css';

export const ToggleLang = () => {
  let toggled;

  const handleLanguageChange = () => {
    // dispatch(toggleLanguage());
    // i18n.changeLanguage(currentLang === 'en' ? 'ru' : 'en');
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
