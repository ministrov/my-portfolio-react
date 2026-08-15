import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdArrowForward } from 'react-icons/md';
import './style.css';

/**
 * Карточка демонстрации проекта с адаптивными изображениями.
 * Вся карточка — ссылка на карточку этого же проекта на странице /projects
 * (переход к якорю `project-{id}`, см. ProjectsList).
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {number} props.id - Id проекта (для ссылки на /projects#project-{id}).
 * @param {string} props.name - Ключ перевода названия проекта.
 * @param {string} props.image - URL десктопного изображения (WebP).
 * @param {string} props.tabletImg - URL планшетного изображения (WebP).
 * @param {string} props.mobileImg - URL мобильного изображения (WebP).
 * @param {string} [props.imageJpeg] - Fallback JPEG для десктопа.
 * @param {string} [props.tabletImgJpeg] - Fallback JPEG для планшета.
 * @param {string} [props.mobileImgJpeg] - Fallback JPEG для мобилки.
 * @param {boolean} [props.renderName=true] - Рендерить ли собственный `<h2>` с названием.
 *   `false` — когда заголовок рисует снаружи один общий узел (см. `StickyShowcase`):
 *   при нескольких наложенных карточках текст не самоперекрывающийся, как фото
 *   (у букв прозрачные промежутки), и заголовок нижней карточки просвечивал бы
 *   сквозь заголовок верхней даже после того, как переход между ними завершился.
 * @returns {React.ReactElement} Карточка проекта.
 */
const ShowcasingCard = ({
  id,
  name,
  image,
  tabletImg,
  mobileImg,
  imageJpeg,
  tabletImgJpeg,
  mobileImgJpeg,
  renderName = true,
}) => {
  const { t } = useTranslation();
  const altText = t('showcasing.alt', { project: t(name) });

  return (
    <article className="showcasing-card">
      {renderName && <h2 className="showcasing-card__name">{t(name)}</h2>}
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
          loading="lazy"
          decoding="async"
        />
      </picture>

      <span className="showcasing-card__cue" aria-hidden="true">
        {t('showcasing.viewProject')}
        <MdArrowForward className="showcasing-card__cue-icon" size={18} />
      </span>

      <Link
        to={`/projects#project-${id}`}
        className="showcasing-card__link"
        aria-label={t('showcasing.ariaLabel', { project: t(name) })}
      />
    </article>
  );
};

export default ShowcasingCard;
