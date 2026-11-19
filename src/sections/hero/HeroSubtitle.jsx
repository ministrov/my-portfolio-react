import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useInView, useReducedMotion } from 'motion/react';
import useScrambleText from '../../hooks/useScrambleText';
import useCharWidths from '../../hooks/useCharWidths';
import useMediaQuery from '../../hooks/useMediaQuery';
import { ANIMATION_DELAYS, fadeUp, fadeUpReduced } from './animations';

/**
 * Подзаголовок героя с эффектом «расшифровки»: символы проявляются слева
 * направо, нераскрытая часть мигает случайными буквами того же алфавита.
 *
 * Скринридер и поисковик читают строку целиком из скрытого `.visually-hidden`:
 * видимые глифы во время расшифровки — шум, поэтому они под `aria-hidden`.
 * Ширина каждого символа зафиксирована замером реального шрифта
 * (`useCharWidths`), чтобы строка не прыгала между переносами, пока символы
 * мигают. На десктопе с мышью расшифровка повторяется циклом и замирает вне
 * кадра; на тач-экранах (`hover: none`) — один раз, при загрузке.
 *
 * Рендерится внутри `LazyMotion` героя — своего `LazyMotion` для `m.p` не
 * заводит. Классы — блока героя (`hero__subtitle*`), стили — в его
 * `style.css`. Текст — из i18n-ключа `hero.subtitle`.
 *
 * @component
 * @returns {JSX.Element} Абзац подзаголовка
 * @example
 * <LazyMotion features={domAnimation}>
 *   <HeroSubtitle />
 * </LazyMotion>
 */
const HeroSubtitle = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const subtitleMotion = prefersReducedMotion ? fadeUpReduced : fadeUp;
  const subtitleRef = useRef(null);
  const isSubtitleInView = useInView(subtitleRef);
  // На таче подзаголовок расшифровывается ровно один раз, при загрузке, и
  // дальше только читается: без цикла (повторный скрамбл приходился на момент
  // первого взгляда) и без паузы по видимости — useScrambleText перезапускает
  // расшифровку при каждом включении `active`, и возврат к герою шифровал бы
  // текст заново. isTouch верен с первого рендера (useSyncExternalStore),
  // поэтому `active` на таче не мигает. На десктопе цикл, как раньше,
  // замирает вне кадра
  const isTouch = useMediaQuery('(hover: none)');
  const subtitleText = t('hero.subtitle');
  const subtitleGlyphs = useScrambleText(subtitleText, {
    delayMs: (ANIMATION_DELAYS.SUBTITLE + 0.15) * 1000,
    stepMs: 30,
    tickMs: 42,
    loop: !isTouch,
    pauseMs: 7000,
    active: isTouch || isSubtitleInView,
  });
  const subtitleCharWidths = useCharWidths(subtitleRef, subtitleText);

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
  );
};

export default HeroSubtitle;
