import { Link } from 'react-router-dom';
import './style.css';

/**
 * Компонент ссылки-кнопки для навигации внутри приложения или внешних ссылок.
 * Поддерживает иконки, открытие в новой вкладке и проброс дополнительных атрибутов.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {string} props.path - Путь для навигации (внутренний) или URL (внешний)
 * @param {string} props.text - Текст ссылки
 * @param {React.ReactNode} [props.icon] - Иконка (React-элемент или строка)
 * @param {boolean} [props.target=false] - Открывать ли ссылку в новой вкладке
 * @param {Object} [props.rest] - Дополнительные атрибуты (например, `aria-label`, `title`),
 *   пробрасываемые в ссылку
 * @returns {JSX.Element} Ссылка-кнопка с иконкой и стилизацией
 *
 * @example
 * <ButtonLink
 *   path="/about"
 *   text="Подробнее"
 *   icon={<FaArrowRight />}
 *   aria-label="Перейти на страницу 'Обо мне'"
 *   title="Нажмите для перехода"
 * />
 */
const ButtonLink = ({
  className = '',
  path,
  text,
  icon = null,
  target = false,
  ...rest
}) => {
  // Определяем, является ли ссылка внешней (начинается с http/https)
  const isExternal = /^https?:\/\//.test(path);

  // Базовые атрибуты, общие для всех ссылок.
  // `...rest` разворачивается первым, чтобы контролируемые атрибуты ниже
  // нельзя было случайно переопределить извне (в частности, безопасный `rel`).
  const commonProps = {
    ...rest,
    className: `button-link ${className}`.trim(),
    target: target ? '_blank' : '_self',
    ...(target && { rel: 'noopener noreferrer' }),
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
      <a href={path} {...commonProps}>
        {content}
      </a>
    );
  }

  // Для внутренних ссылок используем Link
  return (
    <Link to={path} {...commonProps}>
      {content}
    </Link>
  );
};

export default ButtonLink;
