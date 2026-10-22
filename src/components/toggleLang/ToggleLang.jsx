import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import { LANGUAGES } from '../../const';
import './styles.css';

/**
 * Компонент переключателя языка (русский/английский).
 * Использует кастомный хук `useLanguage` для получения текущего языка и функции переключения.
 * Компактная пилюля с текстом текущего языка — клик мгновенно переключает язык.
 *
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {string} [props.className=''] - Дополнительные CSS-классы для кнопки переключателя.
 * @returns {JSX.Element} Кнопка-переключатель языка с текстом текущего языка.
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
  const { t } = useTranslation();
  const { lang, toggleLang } = useLanguage();

  return (
    <div
      role="group"
      className={`toggle-group ${className}`}
      aria-label={t('toggleLang.ariaLabel')}
    >
      {[LANGUAGES.RU, LANGUAGES.EN].map((code) => {
        const isActive = lang === code;

        return (
          <button
            key={code}
            className={`toggle-group__btn ${isActive ? 'toggle-group__btn--active' : ''}`}
            type="button"
            onClick={() => {
              if (!isActive) toggleLang();
            }}
            aria-pressed={isActive}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

export default ToggleLang;
