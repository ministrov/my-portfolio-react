/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import img from '../../assets/error.gif';
import './style.css';

const ErrorMessage = ({ textContent, btnText }) => {
  return (
    <section className="not-found">
      <img className="not-found__image" src={img} alt="error message" />

      <p className="not-found__text">{textContent}</p>

      <Link to="/">
        <a className={'not-found__btn'} href="#" rel="noopener noreferrer">
          {btnText}
          <span className="btn__icon">
            <BsBoxArrowInUpRight width={20} height={20} />
          </span>
        </a>
      </Link>
    </section>
  );
};

export default ErrorMessage;
