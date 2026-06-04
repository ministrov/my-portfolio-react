import { useTranslation } from 'react-i18next';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { TypeAnimation } from 'react-type-animation';
import { useLanguage } from '../../context/LanguageProvider';
import MouseScroll from '../../components/mouseScroll/MouseScroll';
import cvPdf from '../../assets/pdfs/my-cv.pdf';
import './style.css';

/**
 * Константы для анимационных задержек (в секундах)
 */
const ANIMATION_DELAYS = {
  GREETING: 0.2,
  SLOGAN: 0.4,
  BUTTONS: 0.6,
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
 * Компонент промо-секции с центрированным приветствием, слоганом
 * и кнопкой скачивания резюме.
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
              <br />
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
                className="promo__btn"
                href={cvPdf}
                download="Anton_Zhilin_CV.pdf"
                rel="noopener noreferrer"
              >
                {t('promo.promoBtn')}
                <span className="btn__icon">
                  <BsBoxArrowInUpRight />
                </span>
              </a>
            </m.div>
          </div>
        </LazyMotion>
      </div>
      <MouseScroll className="promo__mouse-scroll-cont" />
    </section>
  );
};

export default Promo;
