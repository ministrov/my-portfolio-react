import './style.css';
import pic from './pic1.jpeg';
import Button from '../button/Button';

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__wrapper">
        <h1 className="promo__title">
          <strong>Hi, my name is <em>Anton</em></strong><br />
          a frontend developer
        </h1>
        <div className="promo__text">
          <p>with passion for learning and creating.</p>
        </div>
        <div className="promo__btns">
          <Button href={'#!'}/>
        </div>
      </div>
      <div className="promo__image-wrapper">
        <img src={pic} className="promo__image" alt="Avatar img"/>
      </div>
    </section>
  )
}

export default Promo;