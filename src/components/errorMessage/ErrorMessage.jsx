import { Link } from 'react-router-dom';
import Button from '../button/Button';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import img from '../../assets/error.gif';
import './style.css';

const ErrorMessage = ({ textContent, btnText }) => {
  return (
    <section className="not-found">
      <img className="not-found__image" src={img} alt="error message" />

      <p className="not-found__text">
        {textContent}
      </p>

      <Link to='/'>
        <Button
          className={'not-found__btn'}
          icon={<BsBoxArrowInUpRight width={20} height={20} />}
        >
          {btnText}
        </Button>
      </Link>
    </section>
  );
};

export default ErrorMessage;
