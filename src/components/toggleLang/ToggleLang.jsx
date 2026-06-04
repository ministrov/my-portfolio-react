import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../const';
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
  const { t } = useTranslation();
  const isRu = lang === LANGUAGES.RU;

  const btnClassName = ['toggle-btn', className, !isRu && 'toggled']
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={btnClassName}
      onClick={toggleLang}
      aria-label={t('toggleLang.ariaLabel')}
    >
      <div className="thumb">{isRu ? 'Ру' : 'En'}</div>
    </button>
  );
};

ToggleLang.propTypes = {
  /** Дополнительные CSS-классы для кнопки переключателя */
  className: PropTypes.string,
};

export default ToggleLang;
