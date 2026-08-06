import { useCallback, useRef } from 'react';

/**
 * Связывает таймер автопрокрутки Swiper с индикатором прогресса.
 *
 * Swiper на каждом кадре шлёт `autoplayTimeLeft` с долей оставшегося времени
 * (1 → 0). Хук переворачивает её в долю пройденного и пишет в CSS-переменную
 * `--carousel-progress` напрямую в стиль узла: состояние React здесь дало бы
 * ре-рендер каждый кадр ради двух пикселей заливки.
 *
 * Пауза и возобновление отдельной обработки не требуют — событие просто
 * перестаёт приходить, и полоса замирает там, где стояла.
 *
 * @returns {{ progressRef: React.RefObject<HTMLDivElement>, handleAutoplayTimeLeft: (swiper: Object, time: number, progress: number) => void }}
 *   `progressRef` вешается на {@link CarouselProgress},
 *   `handleAutoplayTimeLeft` — в проп `onAutoplayTimeLeft` Swiper.
 * @example
 * const { progressRef, handleAutoplayTimeLeft } = useAutoplayProgress();
 * <Swiper onAutoplayTimeLeft={handleAutoplayTimeLeft}>…</Swiper>
 * <CarouselProgress ref={progressRef} />
 */
const useAutoplayProgress = () => {
  const progressRef = useRef(null);

  const handleAutoplayTimeLeft = useCallback((_swiper, _time, progress) => {
    progressRef.current?.style.setProperty(
      '--carousel-progress',
      String(1 - progress)
    );
  }, []);

  return { progressRef, handleAutoplayTimeLeft };
};

export default useAutoplayProgress;
