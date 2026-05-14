/**
 * Компонент для отображения иконки "MAX".
 * Использует SVG-изображение из статических ресурсов с возможностью настройки размеров.
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
 * <MaxIcon width={48} height={48} />
 */
const MaxIcon = ({ width = 32, height = 32 }) => {
  return (
    <img
      src="/icons-pack/max-icons/colored/MAX.svg"
      alt="MAX"
      width={width}
      height={height}
    />
  );
};

export default MaxIcon;
