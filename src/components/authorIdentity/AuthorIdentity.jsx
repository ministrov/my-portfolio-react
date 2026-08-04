import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PhotoRing from '../photoRing/PhotoRing';
import AuthorMeta from '../authorMeta/AuthorMeta';
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
      <div className="author-identity__photo">
        <PhotoRing
          src={photo}
          alt={t('authorPhoto.photoAlt')}
          variant="light"
        />
      </div>

      <AuthorMeta variant="light" />
    </m.div>
  );
};

export default AuthorIdentity;
