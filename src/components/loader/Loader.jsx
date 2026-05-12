import './style.css';

/**
 * Компонент индикатора загрузки (спиннер)
 * @param {Object} props - Свойства компонента
 * @param {string} [props.color='blue'] - Цвет спиннера. Доступные значения: 'blue', 'white', 'primary', 'secondary'
 * @param {string} [props.size='medium'] - Размер спиннера. Доступные значения: 'small', 'medium', 'large'
 * @param {boolean} [props.fullScreen=false] - Если true, лоадер растягивается на весь экран с затемнённым фоном
 * @param {string} [props.text] - Текст, отображаемый под спиннером
 * @returns {JSX.Element} Элемент индикатора загрузки
 */
const Loader = ({ color = 'blue', size = 'medium', fullScreen = false, text }) => {
  const loaderClasses = [
    'loader',
    `loader--${color}`,
    `loader--${size}`,
    fullScreen ? 'loader--fullscreen' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={loaderClasses}
      aria-label={text ? `Loading: ${text}` : 'Loading'}
      role="status"
      aria-live="polite"
    >
      <div className="loader__spinner"></div>
      {text && <p className="loader__text">{text}</p>}
    </div>
  );
};

export default Loader;
