import { useTranslation } from 'react-i18next';
import './style.css';

/**
 * Бейдж статуса «Открыт к предложениям»: пульсирующая зелёная точка и подпись.
 *
 * Самостоятельный блок, а не элемент `author-meta`: его показывают и карточка
 * автора (`AuthorMeta`, светлая на главной и тёмная на /about), и первый экран
 * (`Hero`). Внешнюю геометрию (выравнивание во flex-родителе, отступы) задаёт
 * родитель через класс-микс в `className` — сам бейдж её не знает.
 *
 * Текст — ключ `about.available`. Точка декоративная (`aria-hidden`), статус
 * передаёт подпись.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {'light'|'dark'} [props.variant='light'] - Тон фона под бейджем: светлый
 *   (по умолчанию) или тёмный — для IDE-карточки на /about
 * @param {string} [props.className=''] - Класс-микс родителя для внешней геометрии
 * @returns {JSX.Element} Бейдж статуса
 *
 * @example
 * <AvailabilityBadge />
 * <AvailabilityBadge variant="dark" className="author-meta__badge" />
 */
const AvailabilityBadge = ({ variant = 'light', className = '' }) => {
  const { t } = useTranslation();

  // Светлый вариант — базовые стили блока, модификатор нужен только тёмному
  const classes = [
    'availability-badge',
    variant === 'dark' && 'availability-badge--dark',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <p className={classes}>
      <span className="availability-badge__dot" aria-hidden="true" />
      {t('about.available')}
    </p>
  );
};

export default AvailabilityBadge;
