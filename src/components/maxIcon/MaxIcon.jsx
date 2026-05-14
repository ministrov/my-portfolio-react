/**
 * Компонент для отображения иконки "MAX" в виде SVG.
 * Использует встроенный SVG-элемент с фиксированным viewBox и настраиваемыми шириной и высотой.
 *
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {number} [props.width=32] - Ширина SVG в пикселях.
 * @param {number} [props.height=32] - Высота SVG в пикселях.
 * @returns {JSX.Element} SVG-элемент с иконкой MAX.
 *
 * @example
 * // Иконка с размерами по умолчанию (32x32)
 * <MaxIcon />
 *
 * @example
 * // Иконка с кастомными размерами
 * <MaxIcon width={48} height={48} />
 */
const MaxIcon = ({ width = 32, height = 32 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 720 720"
      width={width}
      height={height}
    ></svg>
  );
};

export default MaxIcon;
