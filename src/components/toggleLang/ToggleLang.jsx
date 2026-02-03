import { useLanguage } from '../../hooks/useLanguage';
import './styles.css';

const ToggleLang = ({ className = '' }) => {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      className={`toggle-btn ${className} ${lang === 'ru' ? '' : 'toggled'}`}
      onClick={toggleLang}
    >
      <div className="thumb">{lang === 'ru' ? 'Ру' : 'En'}</div>
    </button>
  );
};

export default ToggleLang;
