import { useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import {
  LazyMotion,
  m,
  domAnimation,
  useInView,
  useReducedMotion,
} from 'motion/react';
import AvailabilityBadge from '../../components/availabilityBadge/AvailabilityBadge';
import CtaButton from '../../components/ctaButton/CtaButton';
import HeroSubtitle from './HeroSubtitle';
import HeroCvButton from './HeroCvButton';
import {
  ANIMATION_DELAYS,
  titleReveal,
  titleRevealReduced,
  ctaPop,
  ctaPopReduced,
} from './animations';
import './style.css';

/**
 * Hero-секция главной страницы: центрированный блок с бейджем статуса,
 * крупным заголовком с градиентным акцентом, подзаголовком, кнопкой
 * скачивания резюме и подсказкой скролла.
 *
 * Сама секция отвечает за раскладку, появление заголовка и кнопок и за
 * модификатор `hero--offscreen`: вне кадра он ставит на паузу бесконечные
 * CSS-анимации — рамку кнопки резюме и покачивание подсказки скролла.
 * Подзаголовок с расшифровкой — {@link HeroSubtitle}, кнопка резюме с
 * подтверждением нажатия — {@link HeroCvButton}; пресеты анимации и порядок
 * появления — в `./animations.js`.
 *
 * До 1024px герой ровно в экран, бейдж виден над заголовком, а подсказка
 * прижата к нижнему краю; до 767px под резюме появляется вторичная
 * контурная «Обсудить проект». На тач-экранах (`hover: none`) подзаголовок
 * расшифровывается без цикла. Десктоп с мышью — без изменений.
 *
 * Текст героя резолвится из i18n-словаря по ключам `hero.*`.
 *
 * @returns {JSX.Element} Hero-секция
 * @example
 * <Hero />
 */
const Hero = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const titleMotion = prefersReducedMotion ? titleRevealReduced : titleReveal;
  const ctaMotion = prefersReducedMotion ? ctaPopReduced : ctaPop;
  // Наблюдаем за блоком контента, а не за секцией: .hero тянется на 100vh и
  // покидает вьюпорт только через целый экран скролла, из-за чего циклы
  // продолжали крутиться далеко за кадром и мигали классом на границе
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef);

  return (
    <section className={`hero${isContentInView ? '' : ' hero--offscreen'}`}>
      <div className="container">
        <LazyMotion features={domAnimation}>
          <div className="hero__inner" ref={contentRef}>
            {/* Статус «открыт к предложениям» — над заголовком и появляется
                вместе с ним; на десктопе скрыт в CSS (см. .hero__badge) */}
            <m.div className="hero__badge" {...titleMotion}>
              <AvailabilityBadge />
            </m.div>

            <h1 className="hero__title">
              {/* Визуальный заголовок — афоризм без ключевых слов; для
                  краулеров и AI-выдачи (GEO) в тот же h1 добавлена
                  скрытая keyword-фраза из meta title, см. metadata.home.title */}
              <span className="visually-hidden">
                {t('metadata.home.title')}
              </span>
              <m.div {...titleMotion}>
                <Trans i18nKey="hero.titleLead" components={{ br: <br /> }} />{' '}
                {/* Акцент всегда с новой строки: заголовок построен как афоризм
                    из двух тактов, и разрыв между ними держит его ритм в обеих локалях */}
                <span className="hero__title-accent hero__title-accent--block">
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

            <HeroSubtitle />

            <m.div className="hero__actions" {...ctaMotion}>
              <HeroCvButton />

              {/* Вторичная «Обсудить проект» — только до 767px, где CTA
                  шапки спрятан в бургер; подпись и скролл к контактам —
                  поведение CtaButton по умолчанию */}
              <CtaButton variant="outline" className="hero__secondary-cta" />
            </m.div>
          </div>
        </LazyMotion>
      </div>

      {/* Подсказка — прямой ребёнок секции, а не .hero__inner: до 1024px она
          позиционируется абсолютно от нижнего края .hero, а у .hero__inner
          свой position: relative */}
      <p
        className="hero__scroll-hint"
        style={{ '--scroll-delay': `${ANIMATION_DELAYS.SCROLL_HINT}s` }}
      >
        {t('hero.scrollHint')}
      </p>
    </section>
  );
};

export default Hero;
