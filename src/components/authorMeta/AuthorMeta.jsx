import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BsGeoAlt } from 'react-icons/bs';
import SocialList from '../socials/SocialList';
import './style.css';

/**
 * Блок метаданных автора: имя, роль, локация, бейдж доступности и соцсети.
 *
 * Используется и на светлой карточке (`AuthorIdentity`), и на тёмной
 * IDE-карточке (`AuthorPhoto`) — общий набор данных для обоих регистров,
 * различается только цветовой вариант.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {'light'|'dark'} [props.variant='light'] - Тон окружающей карточки
 * @example
 * return <AuthorMeta variant="dark" />
 *
 * @returns {JSX.Element} Блок метаданных автора
 */
const AuthorMeta = ({ variant = 'light' }) => {
  const { t } = useTranslation();

  return (
    <div className={`author-meta author-meta--${variant}`}>
      <p className="author-meta__name">{t('authorPhoto.name')}</p>
      <p className="author-meta__role">{t('authorPhoto.role')}</p>
      <p className="author-meta__location">
        <BsGeoAlt className="author-meta__location-icon" aria-hidden="true" />
        {t('authorPhoto.location')}
      </p>

      <div className="author-meta__available">
        <span className="author-meta__available-dot" aria-hidden="true" />
        {t('about.available')}
      </div>

      <SocialList variant={variant === 'dark' ? 'white' : 'blue'} />
    </div>
  );
};

AuthorMeta.propTypes = {
  variant: PropTypes.oneOf(['light', 'dark']),
};

export default AuthorMeta;
