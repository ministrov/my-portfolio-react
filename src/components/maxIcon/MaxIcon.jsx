import maxSvg from '../../assets/svg/max.svg';

/**
 * Компонент для отображения иконки "MAX" в виде SVG.
 * Использует импортированное SVG-изображение с настраиваемыми шириной и высотой.
 *
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {number} [props.width=48] - Ширина иконки в пикселях.
 * @param {number} [props.height=48] - Высота иконки в пикселях.
 * @returns {JSX.Element} Элемент изображения (`<img>`) с иконкой MAX.
 *
 * @example
 * // Иконка с размерами по умолчанию (48x48)
 * <MaxIcon />
 *
 * @example
 * // Иконка с кастомными размерами
 * <MaxIcon width={64} height={64} />
 */
const MaxIcon = ({ width = 48, height = 48 }) => {
  return (
    <img
      src={maxSvg}
      width={width}
      height={height}
      alt="Иконка социальной сети Max"
    />
  );
};

export default MaxIcon;
