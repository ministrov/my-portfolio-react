import { useTranslation } from 'react-i18next';
import { LazyMotion, m, domAnimation } from 'framer-motion';
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

/**
 * Константы для анимационных задержек (в секундах)
 */
const ANIMATION_DELAYS = {
  GREETING: 0.2,
  SLOGAN: 0.4,
  BUTTONS: 0.6,
  IMAGE: 0.4,
};

/**
 * Последовательности для TypeAnimation в зависимости от языка
 */
const TYPE_SEQUENCES = {
  ru: ['Антон Жилин', 1000, 'Frontend Developer', 1000],
  en: ['Anton Zhilin', 1000, 'Frontend Developer', 1000],
};

/**
 * Общая конфигурация анимации
 */
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

/**
 * Компонент промо-секции с приветствием, аватаром и ссылками
 * @returns {JSX.Element} Промо-секция
 */
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
          <LazyMotion features={domAnimation}>
            <div className="promo__text">
              <m.strong
                className="promo__greeting"
                {...commonAnimation}
                transition={{
                  ...commonAnimation.transition,
                  delay: ANIMATION_DELAYS.GREETING,
                }}
              >
                {lang === 'ru' ? 'Привет, Я' : "Hi, I'm"}
                {<br />}
                <TypeAnimation
                  sequence={TYPE_SEQUENCES[lang]}
                  speed={50}
                  repeat={Infinity}
                />
                .
              </m.strong>

              <m.p
                className="promo__slogan"
                {...commonAnimation}
                transition={{
                  ...commonAnimation.transition,
                  delay: ANIMATION_DELAYS.SLOGAN,
                }}
              >
                {t('promo.promoSlogan')}
              </m.p>

              <m.div
                className="promo__btns"
                {...commonAnimation}
                transition={{
                  ...commonAnimation.transition,
                  delay: ANIMATION_DELAYS.BUTTONS,
                }}
              >
                <a
                  className={'promo__btn'}
                  href={cvPdf}
                  download="Anton_Zhilin_CV.pdf"
                  rel="noopener noreferrer"
                >
                  {t('promo.promoBtn')}
                  <span className="btn__icon">
                    <BsBoxArrowInUpRight />
                  </span>
                </a>

                <SocialList variant="blue" />
              </m.div>
            </div>

            <m.div
              className="promo__image"
              {...commonAnimation}
              transition={{
                ...commonAnimation.transition,
                delay: ANIMATION_DELAYS.IMAGE,
              }}
            >
              <picture>
                <source
                  srcSet={`${avatar3x} 1500w`}
                  media="(min-width: 1025px)"
                />
                <source
                  srcSet={`${avatar2x} 1000w`}
                  media="(min-width: 769px)"
                />
                <source srcSet={`${avatar} 500w`} media="(max-width: 768px)" />
                <img
                  className="promo__avatar"
                  src={avatar}
                  width="500"
                  height="500"
                  alt="Пиксельный аватар мужчины с ноутбуком, представляющий автора"
                  fetchpriority="high"
                />
              </picture>
            </m.div>
          </LazyMotion>
        </div>
      </div>
      <MouseScroll className="promo__mouse-scroll-cont" />
    </section>
  );
};

export default Promo;
