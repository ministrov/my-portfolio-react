import { useLanguage } from '../../hooks/useLanguage';
import './styles.css';

/**
 * Компонент переключателя языка (русский/английский).
 * Использует кастомный хук `useLanguage` для получения текущего языка и функции переключения.
 * Визуально представляет собой кнопку-переключатель с индикатором текущего языка.
 *
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {string} [props.className=''] - Дополнительные CSS-классы для кнопки переключателя.
 * @returns {JSX.Element} Кнопка-переключатель языка с индикатором текущего языка.
 *
 * @example
 * // Базовое использование
 * <ToggleLang />
 *
 * @example
 * // С дополнительным классом для стилизации
 * <ToggleLang className="header-toggle" />
 */
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
