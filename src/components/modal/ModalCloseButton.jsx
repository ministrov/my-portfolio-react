import { IoCloseSharp } from 'react-icons/io5';
import PropTypes from 'prop-types';

/**
 * Компонент кнопки закрытия модального окна
 * @component
 * @param {Object} props - Свойства компонента
 * @param {Function} props.onClick - Обработчик клика по кнопке
 * @param {string} props.ariaLabel - Текст для accessibility (aria-label)
 * @param {string} [props.color='white'] - Цвет иконки в формате CSS (например, 'white', '#fff')
 * @param {string} [props.className=''] - Дополнительные CSS-классы
 * @returns {JSX.Element} Элемент кнопки закрытия
 */
const ModalCloseButton = ({
  onClick,
  ariaLabel,
  color = 'white',
  className = '',
}) => {
  const buttonClasses = ['modal__close', className].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
      data-testid="modal-close-button"
    >
      <IoCloseSharp color={color} />
    </button>
  );
};

ModalCloseButton.propTypes = {
  /** Обработчик клика по кнопке */
  onClick: PropTypes.func.isRequired,
  /** Текст для accessibility (aria-label) */
  ariaLabel: PropTypes.string.isRequired,
  /** Цвет иконки в формате CSS */
  color: PropTypes.string,
  /** Дополнительные CSS-классы */
  className: PropTypes.string,
};

export default ModalCloseButton;
