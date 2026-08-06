import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './style.css';

/**
 * Компонент логотипа сайта — текстовый wordmark с мигающей кареткой-курсором.
 * Ведёт на главную; доступное имя ссылки локализуется из словаря `logo`.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {string} [props.className=''] - Дополнительные CSS-классы
 * @param {('white'|'monochrome')} [props.variant] - Вариант оформления; не задан — кобальтовый по умолчанию
 * @param {('small'|'medium'|'large')} [props.size='medium'] - Размер логотипа
 * @param {boolean} [props.showIcon=true] - Показывать ли акцентную каретку-курсор
 * @param {string} [props.text='AntoshkinDev'] - Текст логотипа
 * @returns {JSX.Element} Элемент логотипа
 *
 * @example
 * <Logo />
 * <Logo variant="white" size="large" />
 */
/** Акцентная часть wordmark'а, которая красится отдельным цветом */
const ACCENT_TEXT = 'Dev';

const Logo = ({
  className = '',
  variant,
  size = 'medium',
  showIcon = true,
  text = 'AntoshkinDev',
}) => {
  const { t } = useTranslation();

  // Определяем классы на основе пропсов
  const linkClasses = [
    'logo',
    'logo__link',
    variant ? `logo__link--${variant}` : '',
    `logo--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Двухцветный wordmark: базовая часть + акцентный хвост "Dev"
  const hasAccent = text.endsWith(ACCENT_TEXT);
  const baseText = hasAccent
    ? text.slice(0, text.length - ACCENT_TEXT.length)
    : text;

  return (
    <Link
      to="/"
      className={linkClasses}
      aria-label={t('logo.ariaLabel', { text })}
    >
      <span className="logo__text">{baseText}</span>
      {hasAccent && (
        <span className="logo__text logo__text--accent">{ACCENT_TEXT}</span>
      )}
      {showIcon && (
        <span className="logo__caret" aria-hidden="true">
          _
        </span>
      )}
    </Link>
  );
};

export default Logo;
