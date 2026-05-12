import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент ссылки-кнопки для навигации внутри приложения или внешних ссылок.
 * Поддерживает иконки, открытие в новой вкладке и дополнительные атрибуты доступности.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {string} props.className - Дополнительные CSS-классы
 * @param {string} props.path - Путь для навигации (внутренний) или URL (внешний)
 * @param {string} props.text - Текст ссылки
 * @param {React.ReactNode} [props.icon] - Иконка (React-элемент или строка)
 * @param {boolean} [props.target=false] - Открывать ли ссылку в новой вкладке
 * @param {string} [props.ariaLabel] - ARIA-метка для доступности (если текст недостаточен)
 * @param {string} [props.title] - Всплывающая подсказка (title атрибут)
 * @param {Object} [props.rest] - Дополнительные атрибуты, передаваемые в NavLink
 * @returns {JSX.Element} Ссылка-кнопка с иконкой и стилизацией
 *
 * @example
 * <ButtonLink
 *   path="/about"
 *   text="Подробнее"
 *   icon={<FaArrowRight />}
 *   target={false}
 *   ariaLabel="Перейти на страницу 'Обо мне'"
 *   title="Нажмите для перехода"
 * />
 */
const ButtonLink = ({
  className = '',
  path,
  text,
  icon = null,
  target = false,
  ariaLabel = undefined,
  title = undefined,
  ...rest
}) => {
  // Определяем, является ли ссылка внешней (начинается с http/https)
  const isExternal = /^https?:\/\//.test(path);
  
  // Для внешних ссылок используем обычный тег <a>, для внутренних — NavLink
  const linkProps = {
    className: `button-link ${className}`.trim(),
    to: path,
    target: target ? '_blank' : '_self',
    rel: target ? 'noopener noreferrer' : undefined,
    'aria-label': ariaLabel,
    title: title,
    ...rest,
  };

  const content = (
    <>
      {text}
      {icon && <span className="button-link__icon" aria-hidden="true">{icon}</span>}
    </>
  );

  if (isExternal) {
    // Для внешних ссылок используем обычный <a>
    return (
      <a
        href={path}
        className={linkProps.className}
        target={linkProps.target}
        rel={linkProps.rel}
        aria-label={linkProps['aria-label']}
        title={linkProps.title}
        {...rest}
      >
        {content}
      </a>
    );
  }

  // Для внутренних ссылок используем NavLink
  return (
    <NavLink {...linkProps}>
      {content}
    </NavLink>
  );
};

ButtonLink.propTypes = {
  /** Дополнительные CSS-классы */
  className: PropTypes.string,
  /** Путь для навигации (внутренний) или URL (внешний) */
  path: PropTypes.string.isRequired,
  /** Текст ссылки */
  text: PropTypes.string.isRequired,
  /** Иконка (React-элемент или строка) */
  icon: PropTypes.node,
  /** Открывать ли ссылку в новой вкладке */
  target: PropTypes.bool,
  /** ARIA-метка для доступности */
  ariaLabel: PropTypes.string,
  /** Всплывающая подсказка (title атрибут) */
  title: PropTypes.string,
};

ButtonLink.defaultProps = {
  className: '',
  icon: null,
  target: false,
  ariaLabel: undefined,
  title: undefined,
};

export default ButtonLink;
