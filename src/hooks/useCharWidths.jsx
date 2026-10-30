import { useEffect, useState } from 'react';

let measureContext;

/**
 * Возвращает переиспользуемый canvas 2D-контекст для измерения текста,
 * создавая его лениво при первом обращении.
 * @returns {CanvasRenderingContext2D} Контекст для измерения ширины текста.
 */
function getMeasureContext() {
  if (!measureContext) {
    measureContext = document.createElement('canvas').getContext('2d');
  }
  return measureContext;
}

/**
 * Измеряет ширину (px) каждого символа текста в реальном шрифте переданного
 * элемента. Нужен, чтобы зафиксировать ширину символа во время работы
 * useScrambleText — пока символ мигает случайными глифами, у пропорционального
 * шрифта их ширина отличается от финальной буквы, из-за чего строка может
 * "прыгать" между переносами прямо во время анимации. Перемеряет повторно
 * после загрузки веб-шрифтов — по `document.fonts.ready` и по событию
 * `loadingdone`, — чтобы не закрепить ширины, снятые с шрифта-заглушки, а
 * также при ресайзе окна — размер шрифта элемента может зависеть от viewport
 * через `clamp()`, и без перемера старые ширины разъедутся с реальным
 * начертанием. Ресайз перемеряет, только если изменилась строка `font`.
 *
 * @param {React.RefObject<HTMLElement>} elementRef - Ref на элемент, чей вычисленный шрифт используется для измерения.
 * @param {string} text - Текст, для которого нужны ширины символов.
 * @returns {number[]|null} Массив ширин символов (px) в порядке текста, либо null, пока измерение не готово.
 *
 * @example
 * const widths = useCharWidths(subtitleRef, subtitleText);
 * // widths[i] — ширина i-го символа subtitleText в px
 */
const useCharWidths = (elementRef, text) => {
  const [widths, setWidths] = useState(null);

  useEffect(() => {
    if (!elementRef.current) return undefined;

    let cancelled = false;
    let lastFont = '';

    const measure = () => {
      if (cancelled || !elementRef.current) return;

      const style = window.getComputedStyle(elementRef.current);
      const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      if (font === lastFont) return;
      lastFont = font;

      const ctx = getMeasureContext();
      ctx.font = font;
      setWidths(Array.from(text).map((char) => ctx.measureText(char).width));
    };

    // После загрузки веб-шрифта строка `font` та же — меняются только глифы.
    // Без сброса перемер вышел бы на сравнении с lastFont, и ширины
    // шрифта-заглушки остались бы навсегда: «Middle» в плашке разрежен
    const remeasure = () => {
      lastFont = '';
      measure();
    };

    measure();
    // `ready` ловит шрифты, которые уже грузятся. `loadingdone` — те, что
    // начали грузиться позже: веб-шрифт запрашивается при первой отрисовке
    // текста, и к монтированию `ready` может быть уже выполнен с заглушкой.
    // Golos Text к тому же грузится двумя файлами (кириллица и латиница)
    const fonts = document.fonts;
    fonts?.ready.then(remeasure);
    fonts?.addEventListener('loadingdone', remeasure);

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(elementRef.current);

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      fonts?.removeEventListener('loadingdone', remeasure);
    };
  }, [elementRef, text]);

  return widths;
};

export default useCharWidths;
