import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import {
  LazyMotion,
  m,
  domAnimation,
  useInView,
  useReducedMotion,
} from 'motion/react';
import { GoArrowUpRight, GoCheck } from 'react-icons/go';
import useScrambleText from '../../hooks/useScrambleText';
import useCharWidths from '../../hooks/useCharWidths';
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
 * @type {import('motion/react').MotionProps}
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
 * Облегчённая версия fadeUp для prefers-reduced-motion: только прозрачность,
 * без вертикального сдвига — контент всё ещё проявляется, но не движется.
 * @type {import('motion/react').MotionProps}
 */
const fadeUpReduced = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.4, ease: 'linear' },
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
 * Облегчённая версия titleReveal для prefers-reduced-motion: только
 * прозрачность, без сдвига, поворота и блюра — задержка сохранена, чтобы
 * порядок появления секций остался прежним.
 * @type {import('motion/react').MotionProps}
 */
const titleRevealReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.4,
    delay: ANIMATION_DELAYS.TITLE,
    ease: 'linear',
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

/**
 * Облегчённая версия ctaPop для prefers-reduced-motion: только прозрачность,
 * без масштаба и перелёта — задержка сохранена.
 * @type {import('motion/react').MotionProps}
 */
const ctaPopReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.4,
    delay: ANIMATION_DELAYS.BUTTON,
    ease: 'linear',
  },
};

/**
 * Сколько кнопка CV держит подтверждение нажатия (мс).
 * Скачивание файла уходит в хром браузера и никак не отражается на самой
 * странице — без этого отклика главная конверсия сайта срабатывает молча.
 */
const DOWNLOAD_ACK_MS = 2200;

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
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const titleMotion = prefersReducedMotion ? titleRevealReduced : titleReveal;
  const subtitleMotion = prefersReducedMotion ? fadeUpReduced : fadeUp;
  const ctaMotion = prefersReducedMotion ? ctaPopReduced : ctaPop;
  // Наблюдаем за блоком контента, а не за секцией: .hero тянется на 100vh и
  // покидает вьюпорт только через целый экран скролла, из-за чего циклы
  // продолжали крутиться далеко за кадром и мигали классом на границе
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef);
  const subtitleRef = useRef(null);
  const isSubtitleInView = useInView(subtitleRef);
  const subtitleText = t('hero.subtitle');
  const subtitleGlyphs = useScrambleText(subtitleText, {
    delayMs: (ANIMATION_DELAYS.SUBTITLE + 0.15) * 1000,
    stepMs: 30,
    tickMs: 42,
    loop: true,
    pauseMs: 7000,
    active: isSubtitleInView,
  });
  const subtitleCharWidths = useCharWidths(subtitleRef, subtitleText);
  const [isDownloadAcked, setIsDownloadAcked] = useState(false);
  const ackTimeoutRef = useRef(null);

  // Таймер отклика переживает размонтирование секции, поэтому снимается явно.
  // Флага isMounted здесь быть не должно: обработчик синхронный, гонки нет
  useEffect(() => () => clearTimeout(ackTimeoutRef.current), []);

  /** Подтверждает нажатие на кнопку скачивания резюме. */
  const handleDownload = useCallback(() => {
    setIsDownloadAcked(true);
    clearTimeout(ackTimeoutRef.current);
    ackTimeoutRef.current = setTimeout(
      () => setIsDownloadAcked(false),
      DOWNLOAD_ACK_MS
    );
  }, []);

  // Глифы, сгруппированные по словам. Каждый символ подзаголовка — отдельный
  // inline-block, а значит браузер имеет право перенести строку между любыми
  // двумя символами и рвёт слова посередине. Слово в неразрывной обёртке
  // возвращает переносы на пробелы. Исходный индекс сохраняется: по нему
  // берётся измеренная ширина символа.
  const subtitleWords = useMemo(() => {
    const words = [];
    let word = null;

    subtitleGlyphs.forEach((glyph, index) => {
      if (glyph.char === ' ') {
        word = null;
        words.push({ space: true, glyphs: [{ ...glyph, index }] });
        return;
      }

      if (!word) {
        word = { space: false, glyphs: [] };
        words.push(word);
      }

      word.glyphs.push({ ...glyph, index });
    });

    return words;
  }, [subtitleGlyphs]);

  return (
    <section className={`hero${isContentInView ? '' : ' hero--offscreen'}`}>
      <div className="container">
        <LazyMotion features={domAnimation}>
          <div className="hero__inner" ref={contentRef}>
            <h1 className="hero__title">
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

            <m.p
              ref={subtitleRef}
              className="hero__subtitle"
              {...subtitleMotion}
              transition={{
                ...subtitleMotion.transition,
                delay: ANIMATION_DELAYS.SUBTITLE,
              }}
            >
              <span className="visually-hidden">{subtitleText}</span>
              <span aria-hidden="true">
                {subtitleWords.map(({ space, glyphs }) => {
                  const chars = glyphs.map(({ char, locked, index }) => (
                    <span
                      // Индекс здесь корректный ключ: глифы скрамбла позиционные,
                      // массив не переупорядочивается и не фильтруется
                      key={index}
                      className={`hero__subtitle-char${locked ? '' : ' hero__subtitle-char--decoding'}`}
                      style={
                        subtitleCharWidths
                          ? { width: `${subtitleCharWidths[index]}px` }
                          : undefined
                      }
                    >
                      {char}
                    </span>
                  ));

                  // Пробел остаётся голым символом — на нём и происходит перенос
                  return space ? (
                    chars
                  ) : (
                    <span key={glyphs[0].index} className="hero__subtitle-word">
                      {chars}
                    </span>
                  );
                })}
              </span>
            </m.p>

            <m.div className="hero__actions" {...ctaMotion}>
              <div className="hero__btn-col">
                <div className="hero__btn-frame">
                  <span className="hero__btn-spin" aria-hidden="true" />
                  <a
                    className={`hero__btn${isDownloadAcked ? ' hero__btn--acked' : ''}`}
                    href={cvPdf}
                    download="Anton_Zhilin_CV.pdf"
                    rel="noopener noreferrer"
                    onClick={handleDownload}
                  >
                    {t('hero.btn')}
                    <span className="hero__btn-icon">
                      {isDownloadAcked ? <GoCheck /> : <GoArrowUpRight />}
                    </span>
                  </a>
                </div>

                <span
                  className="visually-hidden"
                  role="status"
                  aria-live="polite"
                >
                  {isDownloadAcked ? t('hero.btnDownloading') : ''}
                </span>
              </div>
            </m.div>

            <p
              className="hero__scroll-hint"
              style={{ '--scroll-delay': `${ANIMATION_DELAYS.SCROLL_HINT}s` }}
            >
              {t('hero.scrollHint')}
            </p>
          </div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default Hero;
