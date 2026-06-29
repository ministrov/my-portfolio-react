import { useTranslation, Trans } from 'react-i18next';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import { GoArrowUpRight } from 'react-icons/go';
import cvPdf from '../../assets/pdfs/my-cv.pdf';
import './style.css';

/**
 * Константы для анимационных задержек появления (в секундах).
 * @type {{ KICKER: number, TITLE: number, SUBTITLE: number, BUTTON: number }}
 */
const ANIMATION_DELAYS = {
  KICKER: 0.1,
  TITLE: 0.25,
  SUBTITLE: 0.4,
  BUTTON: 0.55,
};

/**
 * Базовая конфигурация анимации появления элементов снизу вверх.
 * Используется как общий пресет, поверх которого задаётся индивидуальная задержка.
 * @type {import('framer-motion').MotionProps}
 */
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1],
  },
};

/**
 * Hero-секция главной страницы: центрированный блок с кикером,
 * крупным заголовком с градиентным акцентом, подзаголовком
 * и кнопкой скачивания резюме.
 *
 * Весь текст резолвится из i18n-словаря по ключам `hero.*`.
 *
 * @returns {JSX.Element} Hero-секция
 * @example
 * <Hero />
 */
const Hero = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="hero">
      <div className="container">
        <LazyMotion features={domAnimation}>
          <div className="hero__inner">
            <m.p
              className="hero__kicker"
              {...fadeUp}
              transition={{
                ...fadeUp.transition,
                delay: ANIMATION_DELAYS.KICKER,
              }}
            >
              {t('hero.kicker')}
            </m.p>

            <m.h1
              className="hero__title"
              {...fadeUp}
              transition={{
                ...fadeUp.transition,
                delay: ANIMATION_DELAYS.TITLE,
              }}
            >
              <Trans i18nKey="hero.titleLead" components={{ br: <br /> }} />{' '}
              <span
                className={`hero__title-accent${i18n.language === 'ru' ? ' hero__title-accent--block' : ''}`}
              >
                {t('hero.titleAccent')}
              </span>
            </m.h1>

            <m.p
              className="hero__subtitle"
              {...fadeUp}
              transition={{
                ...fadeUp.transition,
                delay: ANIMATION_DELAYS.SUBTITLE,
              }}
            >
              {t('hero.subtitle')}
            </m.p>

            <m.div
              className="hero__actions"
              {...fadeUp}
              transition={{
                ...fadeUp.transition,
                delay: ANIMATION_DELAYS.BUTTON,
              }}
            >
              <a
                className="hero__btn"
                href={cvPdf}
                download="Anton_Zhilin_CV.pdf"
                rel="noopener noreferrer"
              >
                {t('hero.btn')}
                <span className="hero__btn-icon">
                  <GoArrowUpRight />
                </span>
              </a>
            </m.div>
          </div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default Hero;
