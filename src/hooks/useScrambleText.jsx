import { useEffect, useMemo, useRef, useState } from 'react';

/** Медиа-запрос для определения предпочтения уменьшенного движения */
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const CYRILLIC = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯабвгдежзийклмнопрстуфхцчшщэюя';
const DIGITS = '0123456789';

const CYRILLIC_RE = /[а-яё]/i;
const LATIN_RE = /[a-z]/i;
const DIGIT_RE = /[0-9]/;

/**
 * Возвращает случайный символ того же алфавита, что и переданный (кириллица,
 * латиница или цифра). Пробелы и пунктуация возвращаются без изменений —
 * это удерживает границы слов на месте и не даёт тексту "прыгать".
 *
 * @param {string} char - Исходный символ.
 * @returns {string} Случайный символ того же алфавита либо исходный символ.
 */
function randomGlyphFor(char) {
  if (CYRILLIC_RE.test(char))
    return CYRILLIC[(Math.random() * CYRILLIC.length) | 0];
  if (LATIN_RE.test(char)) return LATIN[(Math.random() * LATIN.length) | 0];
  if (DIGIT_RE.test(char)) return DIGITS[(Math.random() * DIGITS.length) | 0];
  return char;
}

/**
 * Хук «декодирования» текста: символы раскрываются слева направо, а ещё не
 * зафиксированная часть мигает случайными символами того же алфавита до
 * своей очереди. При `loop: true` после полного раскрытия текст держится
 * читаемым `pauseMs`, затем сбрасывается и расшифровывается заново — и так
 * бесконечно. Уважает `prefers-reduced-motion` (с live-подпиской на изменение,
 * как в AnimatedBackground) — в этом случае сразу отдаёт финальный текст без
 * анимации и без цикла, не трогая внутреннее состояние. Побочное следствие:
 * если настройку выключить посреди сессии, до перезапуска расшифровки (`delayMs`)
 * будет виден замерший скрамбл, а не чистый текст.
 *
 * @param {string} text - Финальный текст для отображения.
 * @param {Object} [options]
 * @param {number} [options.delayMs=0] - Задержка перед стартом расшифровки (мс).
 * @param {number} [options.stepMs=16] - Интервал раскрытия символов слева направо (мс/символ).
 * @param {number} [options.tickMs=35] - Частота смены случайных символов у нераскрытой части (мс).
 * @param {boolean} [options.loop=false] - Зациклить расшифровку бесконечно.
 * @param {number} [options.pauseMs=0] - Пауза читаемым текстом между циклами (мс), при `loop: true`.
 * @param {boolean} [options.active=true] - Идёт ли цикл прямо сейчас. При `false` (например,
 *   элемент вне вьюпорта) все таймеры останавливаются и текст замирает как есть, не тратя
 *   CPU/батарею на невидимую анимацию; при возврате в `true` цикл стартует заново с `delayMs`.
 * @returns {Array<{ char: string, locked: boolean }>} Символы текста с флагом «уже раскрыт».
 *
 * @example
 * const glyphs = useScrambleText('Привет, мир', { delayMs: 400, loop: true, pauseMs: 7000, active: isInView });
 * glyphs.map(({ char, locked }, i) => (
 *   <span key={i} className={locked ? '' : 'is-decoding'}>{char}</span>
 * ));
 */
const useScrambleText = (
  text,
  {
    delayMs = 0,
    stepMs = 16,
    tickMs = 35,
    loop = false,
    pauseMs = 0,
    active = true,
  } = {}
) => {
  const [glyphs, setGlyphs] = useState(() =>
    Array.from(text).map((char) => ({ char, locked: true }))
  );
  const isMountedRef = useRef(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia(REDUCED_MOTION_QUERY).matches
  );

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = (event) => setPrefersReducedMotion(event.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  /** Готовый текст без анимации — то, что отдаётся при `prefers-reduced-motion` */
  const finalGlyphs = useMemo(
    () => Array.from(text).map((char) => ({ char, locked: true })),
    [text]
  );

  useEffect(() => {
    if (prefersReducedMotion || !active) return undefined;

    const nextChars = Array.from(text);

    let interval;
    let timeout;

    const decode = () => {
      let elapsed = 0;

      interval = setInterval(() => {
        if (!isMountedRef.current) return;

        elapsed += tickMs;
        const revealCount = Math.min(
          nextChars.length,
          Math.floor(elapsed / stepMs)
        );

        setGlyphs(
          nextChars.map((char, i) => ({
            char: i < revealCount ? char : randomGlyphFor(char),
            locked: i < revealCount,
          }))
        );

        if (revealCount >= nextChars.length) {
          clearInterval(interval);
          if (loop) timeout = setTimeout(decode, pauseMs);
        }
      }, tickMs);
    };

    timeout = setTimeout(decode, delayMs);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [
    text,
    delayMs,
    stepMs,
    tickMs,
    prefersReducedMotion,
    loop,
    pauseMs,
    active,
  ]);

  return prefersReducedMotion ? finalGlyphs : glyphs;
};

export default useScrambleText;
