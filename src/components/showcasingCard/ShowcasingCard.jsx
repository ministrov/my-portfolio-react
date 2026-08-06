import { useTranslation } from 'react-i18next';
import './style.css';

/**
 * Карточка демонстрации проекта с адаптивными изображениями.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.name - Ключ перевода названия проекта.
 * @param {string} props.image - URL десктопного изображения (WebP).
 * @param {string} props.tabletImg - URL планшетного изображения (WebP).
 * @param {string} props.mobileImg - URL мобильного изображения (WebP).
 * @param {string} [props.imageJpeg] - Fallback JPEG для десктопа.
 * @param {string} [props.tabletImgJpeg] - Fallback JPEG для планшета.
 * @param {string} [props.mobileImgJpeg] - Fallback JPEG для мобилки.
 * @returns {React.ReactElement} Карточка проекта.
 */
const ShowcasingCard = ({
  name,
  image,
  tabletImg,
  mobileImg,
  imageJpeg,
  tabletImgJpeg,
  mobileImgJpeg,
}) => {
  const { t } = useTranslation();
  const altText = t('showcasing.alt', { project: t(name) });

  return (
    <article className="showcasing-card">
      <h2 className="showcasing-card__name">{t(name)}</h2>
      <picture className="showcasing-card__picture">
        {/* Мобильные устройства (до 767px) */}
        <source
          media="(max-width: 767px)"
          type="image/webp"
          srcSet={mobileImg}
        />
        {mobileImgJpeg && (
          <source
            media="(max-width: 767px)"
            type="image/jpeg"
            srcSet={mobileImgJpeg}
          />
        )}

        {/* Планшеты (768px — 1024px) */}
        <source
          media="(min-width: 768px) and (max-width: 1024px)"
          type="image/webp"
          srcSet={tabletImg}
        />
        {tabletImgJpeg && (
          <source
            media="(min-width: 768px) and (max-width: 1024px)"
            type="image/jpeg"
            srcSet={tabletImgJpeg}
          />
        )}

        {/* Десктоп (1025px и выше) */}
        <source media="(min-width: 1025px)" type="image/webp" srcSet={image} />
        {imageJpeg && (
          <source
            media="(min-width: 1025px)"
            type="image/jpeg"
            srcSet={imageJpeg}
          />
        )}

        <img
          src={image}
          className="showcasing-card__image"
          alt={altText}
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </article>
  );
};

export default ShowcasingCard;
