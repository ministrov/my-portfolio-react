import './style.css';
import pic from './pic1.jpeg';

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
        <a href="#!" className="btn">Download CV</a>
      </div>
      <div className="promo__image-wrapper">
        <img src={pic} className="promo__image" alt="Avatar img"/>
      </div>
    </section>
  )
}

export default Promo;