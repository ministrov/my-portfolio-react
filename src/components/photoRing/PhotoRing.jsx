import './style.css';

/**
 * Кольцо-фото автора: изображение в градиентной рамке с нижним скримом,
 * который растворяет обрезанный край фото в подложке карточки.
 *
 * Используется и на светлой карточке (`AuthorIdentity`), и на тёмной
 * IDE-карточке (`AuthorPhoto`) — общий визуальный приём для обоих регистров.
 *
 * При наведении показывает пунктирную рамку и JSX-тег в духе «inspect
 * element» из devtools — фирменная деталь для технически подкованного
 * посетителя, продолжающая мотив «консоли разработчика» (см. DESIGN.md).
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {string} props.src - Путь к изображению
 * @param {string} props.alt - Альтернативный текст изображения
 * @param {number} [props.size=260] - Размер фото в пикселях (ширина и высота)
 * @param {'light'|'dark'} [props.variant='light'] - Тон окружающей карточки, влияет только на тень кольца
 * @example
 * return <PhotoRing src={photo} alt="Автор" variant="dark" />
 *
 * @returns {JSX.Element} Кольцо-фото
 */
const PhotoRing = ({ src, alt, size = 260, variant = 'light' }) => (
  <figure className={`photo-ring photo-ring--${variant}`}>
    <img
      className="photo-ring__img"
      src={src}
      width={size}
      height={size}
      alt={alt}
      loading="lazy"
    />
    <span className="photo-ring__inspect" aria-hidden="true">
      <span className="photo-ring__inspect-tag">&lt;PhotoRing /&gt;</span>
    </span>
  </figure>
);

export default PhotoRing;
