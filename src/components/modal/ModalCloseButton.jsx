import { IoCloseSharp } from 'react-icons/io5';

/**
 * Компонент кнопки закрытия модального окна
 * @param {Object} props - Свойства компонента
 * @param {Function} props.onClick - Обработчик клика по кнопке
 * @param {string} props.ariaLabel - Текст для accessibility (aria-label)
 * @param {string} [props.color='white'] - Цвет иконки в формате CSS (например, 'white', '#fff')
 * @param {string} [props.className=''] - Дополнительные CSS-классы
 * @returns {JSX.Element} Элемент кнопки закрытия
 */
const ModalCloseButton = ({ onClick, ariaLabel, color = 'white', className = '' }) => {
  return (
    <button
      className={`modal__close ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
      data-testid="modal-close-button"
    >
      <IoCloseSharp color={color} />
    </button>
  );
};

export default ModalCloseButton;