import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BsGeoAlt } from 'react-icons/bs';
import SocialList from '../socials/SocialList';
import photo from '../../assets/png/photo.webp';
import './style.css';

/** Кривая плавности появления карточки */
const EASE = [0.25, 0.1, 0.25, 1];

/** Анимация идентификационной карточки: появление слева */
const IDENTITY_ANIMATION = {
  initial: { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: EASE, delay: 0.2 },
};

/**
 * Идентификационная карточка автора: фото, имя, роль, локация,
 * бейдж доступности и список соцсетей. Анимируется появлением слева.
 *
 * Использует `m.*` из Framer Motion, поэтому должна рендериться внутри
 * `<LazyMotion features={domAnimation}>` (провайдер задаётся вызывающей секцией).
 *
 * @component
 * @example
 * return <AuthorIdentity />
 *
 * @returns {JSX.Element} Карточка автора
 */
const AuthorIdentity = () => {
  const { t } = useTranslation();

  return (
    <m.div className="author-identity" {...IDENTITY_ANIMATION}>
      <figure className="author-identity__photo-ring">
        <img
          className="author-identity__img"
          src={photo}
          width={260}
          height={260}
          alt={t('authorPhoto.photoAlt')}
          loading="lazy"
        />
      </figure>

      {/* Метаданные автора */}
      <div className="author-identity__meta">
        <p className="author-identity__name">{t('authorPhoto.name')}</p>
        <p className="author-identity__role">{t('authorPhoto.role')}</p>
        <p className="author-identity__location">
          <BsGeoAlt
            className="author-identity__location-icon"
            aria-hidden="true"
          />
          {t('authorPhoto.location')}
        </p>

        <div className="author-identity__available">
          <span className="author-identity__available-dot" aria-hidden="true" />
          {t('about.available')}
        </div>

        <SocialList variant="blue" />
      </div>
    </m.div>
  );
};

export default AuthorIdentity;
