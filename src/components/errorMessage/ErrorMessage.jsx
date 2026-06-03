import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import PropTypes from 'prop-types';
import img from '../../assets/error.gif';
import './style.css';

/**
 * Компонент для отображения сообщения об ошибке или состоянии "не найдено".
 * Текст и подпись кнопки локализуются: при отсутствии пропсов берутся
 * значения из словаря `errorMessage`.
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {string} [props.textContent] - Текст сообщения об ошибке
 * @param {string} [props.btnText] - Текст на кнопке возврата
 * @returns {JSX.Element} React компонент
 *
 * @example
 * <ErrorMessage
 *   textContent={t('errorMessage.message')}
 *   btnText={t('errorMessage.back')}
 * />
 */
const ErrorMessage = ({ textContent, btnText }) => {
  const { t } = useTranslation();

  return (
    <section className="not-found" role="alert">
      <img className="not-found__image" src={img} alt="" loading="lazy" />

      <p className="not-found__text">{textContent ?? t('errorMessage.message')}</p>

      <Link className="not-found__btn" to="/">
        {btnText ?? t('errorMessage.back')}
        <span className="not-found__btn-icon" aria-hidden="true">
          <BsBoxArrowInUpRight size={20} />
        </span>
      </Link>
    </section>
  );
};

ErrorMessage.propTypes = {
  /** Текст сообщения об ошибке */
  textContent: PropTypes.string,
  /** Текст на кнопке возврата */
  btnText: PropTypes.string,
};

export default ErrorMessage;
