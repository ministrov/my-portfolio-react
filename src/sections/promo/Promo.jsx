import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { TypeAnimation } from 'react-type-animation';
import { useLanguage } from '../../context/LanguageProvider';
import SocialList from '../../components/socials/SocialList';
import MouseScroll from '../../components/mouseScroll/MouseScroll';
import avatar from '../../assets/png/my-avatar.webp';
import avatar2x from '../../assets/png/my-avatar-1000.webp';
import avatar3x from '../../assets/png/my-avatar-1500.webp';
import cvPdf from '../../assets/pdfs/my-cv.pdf';
import './style.css';

const commonAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: { margin: '-50px' },
  transition: {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1],
  },
};

const Promo = () => {
  const { lang } = useLanguage();
  const { t } = useTranslation();

  return (
    <section className="promo">
      <h2 className="visually-hidden">
        A promo section for introduction of the author
      </h2>
      <div className="container">
        <div className="promo__wrapper">
          <div className="promo__text">
            <motion.strong
              className="promo__greeting"
              {...commonAnimation}
              transition={{
                ...commonAnimation.transition,
                delay: 0.2,
              }}
            >
              {lang === 'ru' ? 'Привет, Я' : "Hi, I'm"}
              {<br />}
              {lang === 'ru' && (
                <TypeAnimation
                  sequence={['Антон Жилин', 1000, 'Frontend Developer', 1000]}
                  speed={50}
                  repeat={Infinity}
                />
              )}
              {lang === 'en' && (
                <TypeAnimation
                  sequence={['Anton Zhilin', 1000, 'Frontend Developer', 1000]}
                  speed={50}
                  repeat={Infinity}
                />
              )}
              .
            </motion.strong>

            <motion.p
              className="promo__slogan"
              {...commonAnimation}
              transition={{
                ...commonAnimation.transition,
                delay: 0.4,
              }}
            >
              {t('promo.promoSlogan')}
            </motion.p>

            <motion.div
              className="promo__btns"
              {...commonAnimation}
              transition={{
                ...commonAnimation.transition,
                delay: 0.6,
              }}
            >
              <a
                className={'promo__btn'}
                href={cvPdf}
                download={cvPdf}
                rel="noopener noreferrer"
              >
                {t('promo.promoBtn')}
                <span className="btn__icon">
                  <BsBoxArrowInUpRight width={20} height={20} />
                </span>
              </a>

              <SocialList variant="blue" />
            </motion.div>
          </div>

          <motion.div
            key="promo-image"
            className="promo__image"
            {...commonAnimation}
            transition={{
              ...commonAnimation.transition,
              delay: 0.4,
            }}
          >
            <picture>
              <source
                srcSet={`${avatar3x} 1500w`}
                media="(min-width: 1025px)"
              />
              <source srcSet={`${avatar2x} 1000w`} media="(min-width: 769px)" />
              <source srcSet={`${avatar} 500w`} media="(max-width: 768px)" />
              <img
                className="promo__avatar"
                src={avatar}
                width="500"
                height="500"
                alt="Avatar a pixel man with a laptop"
                fetchpriority="true"
              />
            </picture>
          </motion.div>
        </div>
      </div>
      <MouseScroll />
    </section>
  );
};

export default Promo;
