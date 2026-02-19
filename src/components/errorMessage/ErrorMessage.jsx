import { Link } from 'react-router-dom';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import img from '../../assets/error.gif';
import './style.css';

const ErrorMessage = ({ textContent, btnText }) => {
  return (
    <section className="not-found">
      <img className="not-found__image" src={img} alt="error message" />

      <p className="not-found__text">{textContent}</p>

      <Link className={'not-found__btn'} to="/" rel="noopener noreferrer">
        {btnText}
        <span className="btn__icon">
          <BsBoxArrowInUpRight width={20} height={20} />
        </span>
      </Link>
    </section>
  );
};

export default ErrorMessage;
