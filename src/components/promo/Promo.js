import { motion } from 'framer-motion';
import Button from '../button/Button';
import pic from './pic1.jpeg';
import './style.css';


const Promo = ({ setIsOpen }) => {
  return (
    <section className="promo">
      <motion.div
        className="promo__wrapper"
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1}}
        transition={{ type: 'tween', duration: 1 }}
      >
        <h1 className="promo__title">
          <strong>Hi, my name is <em>Anton</em></strong><br />
          a frontend developer
        </h1>
        <div className="promo__text">
          <p>with passion for learning and creating.</p>
        </div>
        <div className="promo__btns">
          <Button text={'Download CV'} href={'#!'}/>
          <Button onClick={() => setIsOpen(true)} text={'Click me'} />
        </div>
      </motion.div>
      <motion.div
        className="promo__image-wrapper"
        initial={{ x: 50, opacity: 1}}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ type: 'tween', duration: 1 }}
      >
        <img src={pic} className="promo__image" alt="Avatar img"/>
      </motion.div>
    </section>
  )
}

export default Promo;