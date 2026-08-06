import { useTranslation } from 'react-i18next';
import './style.css';

/**
 * Компонент индикатора загрузки (спиннер).
 * Доступное имя берётся из словаря `loader` и зависит от наличия пропа `text`.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {('blue'|'white')} [props.color='blue'] - Цвет спиннера
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

export default Loader;
