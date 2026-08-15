import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdArrowForward } from 'react-icons/md';
import ShowcasingCardPicture from './ShowcasingCardPicture';
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

  return (
    <article className="showcasing-card">
      {renderName && <h2 className="showcasing-card__name">{t(name)}</h2>}
      <ShowcasingCardPicture
        name={name}
        image={image}
        tabletImg={tabletImg}
        mobileImg={mobileImg}
        imageJpeg={imageJpeg}
        tabletImgJpeg={tabletImgJpeg}
        mobileImgJpeg={mobileImgJpeg}
      />

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
