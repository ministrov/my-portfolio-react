import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент индикатора загрузки (спиннер).
 * Доступное имя берётся из словаря `loader` и зависит от наличия пропа `text`.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {('blue'|'white'|'primary'|'secondary')} [props.color='blue'] - Цвет спиннера
 * @param {('small'|'medium'|'large')} [props.size='medium'] - Размер спиннера
 * @param {boolean} [props.fullScreen=false] - Если true, лоадер растягивается на весь экран с затемнённым фоном
 * @param {string} [props.text] - Текст, отображаемый под спиннером
 * @returns {JSX.Element} Элемент индикатора загрузки
 *
 * @example
 * <Loader />
 * <Loader color="white" size="large" fullScreen text={t('loader.loading')} />
 */
const Loader = ({
  color = 'blue',
  size = 'medium',
  fullScreen = false,
  text,
}) => {
  const { t } = useTranslation();

  const loaderClasses = [
    'loader',
    `loader--${color}`,
    `loader--${size}`,
    fullScreen ? 'loader--fullscreen' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={loaderClasses}
      aria-label={
        text ? t('loader.loadingText', { text }) : t('loader.loading')
      }
      role="status"
    >
      <div className="loader__spinner"></div>
      {text && <p className="loader__text">{text}</p>}
    </div>
  );
};

Loader.propTypes = {
  /** Цвет спиннера */
  color: PropTypes.oneOf(['blue', 'white', 'primary', 'secondary']),
  /** Размер спиннера */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Полноэкранный режим с затемнённым фоном */
  fullScreen: PropTypes.bool,
  /** Текст под спиннером */
  text: PropTypes.string,
};

export default Loader;
