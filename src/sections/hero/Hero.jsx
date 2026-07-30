import { useTranslation, Trans } from 'react-i18next';
import { LazyMotion, MotionConfig, m, domAnimation } from 'framer-motion';
import { GoArrowUpRight } from 'react-icons/go';
import cvPdf from '../../assets/pdfs/my-cv.pdf';
import './style.css';

/**
 * Константы для анимационных задержек появления (в секундах).
 * @type {{ TITLE: number, SUBTITLE: number, BUTTON: number }}
 */
const ANIMATION_DELAYS = {
  TITLE: 0.25,
  SUBTITLE: 0.4,
  BUTTON: 0.55,
  SCROLL_HINT: 0.7,
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
 * Появление заголовка сквозь маску: контент "всплывает" из-под нижней границы
 * h1 (у которого overflow:hidden в CSS) со снятием блюра и лёгким поворотом.
 * Единый блок вместо покадрового реveal по строкам — переносы строк зависят
 * от языка (ru использует <br/>, en переносится естественно), поэтому строки
 * не фиксированы и не могут анимироваться по отдельности без риска разъехаться.
 */
const titleReveal = {
  initial: { y: '30%', rotate: 1.2, opacity: 0, filter: 'blur(10px)' },
  animate: { y: 0, rotate: 0, opacity: 1, filter: 'blur(0px)' },
  transition: {
    duration: 1.05,
    delay: ANIMATION_DELAYS.TITLE,
    ease: [0.16, 1, 0.3, 1],
  },
};

/**
 * Появление CTA-кнопки с небольшим "перелётом" (overshoot) по масштабу —
 * кубическая безье с y1 > 1 естественно даёт эффект пружины без keyframe-массивов.
 */
const ctaPop = {
  initial: { opacity: 0, scale: 0.82, y: 14 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: {
    duration: 0.95,
    delay: ANIMATION_DELAYS.BUTTON,
    ease: [0.2, 1.5, 0.35, 1],
  },
};

/** Момент, когда пульсирующее кольцо у CTA начинает проигрываться (после pop) */
const CTA_RING_DELAY =
  ANIMATION_DELAYS.BUTTON + ctaPop.transition.duration + 0.15;

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
          <MotionConfig reducedMotion="user">
            <div className="hero__inner">
              <m.div
                className="hero__bloom"
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: [0, 0.85, 0], scale: [0.3, 1, 1.5] }}
                transition={{
                  duration: 2.2,
                  delay: ANIMATION_DELAYS.TITLE + 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              <h1 className="hero__title">
                <m.div {...titleReveal}>
                  <Trans i18nKey="hero.titleLead" components={{ br: <br /> }} />{' '}
                  <span
                    className={`hero__title-accent${i18n.language === 'ru' ? ' hero__title-accent--block' : ''}`}
                  >
                    {t('hero.titleAccent')}
                  </span>
                </m.div>

                <m.span
                  className="hero__title-glare"
                  aria-hidden="true"
                  initial={{ x: '-120%', skewX: -18, opacity: 0 }}
                  animate={{ x: '220%', skewX: -18, opacity: [0, 0.9, 0.9, 0] }}
                  transition={{
                    duration: 1.5,
                    delay:
                      ANIMATION_DELAYS.TITLE +
                      titleReveal.transition.duration +
                      0.2,
                    times: [0, 0.12, 0.88, 1],
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              </h1>

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

              <m.div className="hero__actions" {...ctaPop}>
                <div className="hero__btn-col">
                  <div className="hero__btn-frame">
                    <span className="hero__btn-spin" aria-hidden="true" />
                    <a
                      className="hero__btn"
                      href={cvPdf}
                      download="Anton_Zhilin_CV.pdf"
                      rel="noopener noreferrer"
                    >
                      <m.span
                        className="hero__btn-ring"
                        aria-hidden="true"
                        initial={{ opacity: 0.5, scale: 0.9 }}
                        animate={{ opacity: 0, scale: 1.55 }}
                        transition={{
                          duration: 1.5,
                          delay: CTA_RING_DELAY,
                          repeat: 1,
                          ease: 'easeOut',
                        }}
                      />
                      {t('hero.btn')}
                      <span className="hero__btn-icon">
                        <GoArrowUpRight />
                      </span>
                    </a>
                  </div>
                </div>
              </m.div>

              <p
                className="hero__scroll-hint"
                style={{ '--scroll-delay': `${ANIMATION_DELAYS.SCROLL_HINT}s` }}
              >
                {t('hero.scrollHint')}
              </p>
            </div>
          </MotionConfig>
        </LazyMotion>
      </div>
    </section>
  );
};

export default Hero;
