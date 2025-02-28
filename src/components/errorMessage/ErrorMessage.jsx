import Button from '../button/Button';
import img from "../../assets/error.gif";
import './style.css';

const ErrorMessage = () => {
  return (
    <section className='not-found'> 
      <img
        className='not-found__image'
        src={img}
        alt="error message"
      />

      <p className="not-found__text">Looks like you're exploring uncharted territory. Try finding your way back home.</p>

      <Button
        text={"back Home"}
        href={"/"}
        className={"not-found__btn btn--med btn--theme"}
      />
    </section>
  );
};

export default ErrorMessage;
