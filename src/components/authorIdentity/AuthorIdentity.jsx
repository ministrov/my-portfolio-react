import { useTranslation } from 'react-i18next';
import PhotoRing from '../photoRing/PhotoRing';
import AuthorMeta from '../authorMeta/AuthorMeta';
import photo from '../../assets/png/photo.webp';
import './style.css';

/**
 * Идентификационная карточка автора: фото, имя, роль, локация,
 * бейдж доступности и список соцсетей.
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
    <div className="author-identity">
      <div className="author-identity__photo">
        <PhotoRing
          src={photo}
          alt={t('authorPhoto.photoAlt')}
          variant="light"
        />
      </div>

      <AuthorMeta variant="light" />
    </div>
  );
};

export default AuthorIdentity;
