import { Link } from 'react-router-dom';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import img from '../../assets/error.gif';
import './style.css';

/**
 * Компонент для отображения сообщения об ошибке или состоянии "не найдено"
 * @param {Object} props - Свойства компонента
 * @param {string} props.textContent - Текст сообщения об ошибке
 * @param {string} props.btnText - Текст на кнопке возврата
 * @returns {JSX.Element} React компонент
 */
const ErrorMessage = ({
  textContent = 'Страница не найдена',
  btnText = 'Вернуться на главную'
}) => {
  return (
    <section className="not-found" role="alert" aria-live="polite">
      <img
        className="not-found__image"
        src={img}
        alt="Анимация ошибки"
        loading="lazy"
      />

      <p className="not-found__text">{textContent}</p>

      <Link className="not-found__btn" to="/">
        {btnText}
        <span className="not-found__btn-icon">
          <BsBoxArrowInUpRight size={20} />
        </span>
      </Link>
    </section>
  );
};

export default ErrorMessage;
