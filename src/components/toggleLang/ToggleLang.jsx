import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import { LANGUAGES } from '../../const';
import './styles.css';

/**
 * Переключатель языка интерфейса — сегмент из двух кнопок RU и EN.
 * Паттерн toggle button из WAI-ARIA APG: кнопки в группе `role="group"`, текущий язык отмечен
 * через `aria-pressed`. Посетитель видит обе опции и понимает, на какой язык переключит клик, —
 * прежняя пилюля показывала только текущий язык.
 * Язык и функцию переключения даёт хук `useLanguage` из `hooks/`, он же синхронизирует i18next.
 *
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {string} [props.className=''] - Дополнительные CSS-классы для группы.
 * @returns {JSX.Element} Группа из двух кнопок RU и EN с отмеченным текущим языком.
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

  /**
   * Переключает язык по клику на неактивную кнопку; клик по текущему языку ничего не делает.
   * Кнопка текущего языка не блокируется через `disabled`, чтобы оставаться в Tab-порядке.
   * @param {boolean} isActive - Отмечена ли нажатая кнопка как текущий язык.
   * @returns {void}
   */
  const handleClick = (isActive) => {
    if (!isActive) toggleLang();
  };

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
            onClick={() => handleClick(isActive)}
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
