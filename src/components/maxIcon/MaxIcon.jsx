import PropTypes from 'prop-types';
import maxSvg from '../../assets/svg/max.svg';

/**
 * Компонент для отображения иконки "MAX" в виде SVG.
 * Иконка декоративная (`alt=""`): доступное имя несёт ссылка-обёртка
 * `SocialItem` через свой `aria-label`, поэтому подпись у `<img>` не нужна.
 *
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {number} [props.width=32] - Ширина иконки в пикселях.
 * @param {number} [props.height=32] - Высота иконки в пикселях.
 * @returns {JSX.Element} Элемент изображения (`<img>`) с иконкой MAX.
 *
 * @example
 * // Иконка с размерами по умолчанию (32x32)
 * <MaxIcon />
 *
 * @example
 * // Иконка с кастомными размерами
 * <MaxIcon width={64} height={64} />
 */
const MaxIcon = ({ width = 32, height = 32 }) => {
  return <img src={maxSvg} width={width} height={height} alt="" />;
};

MaxIcon.propTypes = {
  /** Ширина иконки в пикселях */
  width: PropTypes.number,
  /** Высота иконки в пикселях */
  height: PropTypes.number,
};

export default MaxIcon;
