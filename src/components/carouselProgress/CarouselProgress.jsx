import './style.css';

/**
 * Индикатор прогресса автопрокрутки карусели.
 *
 * Существует, потому что карусель отзывов меняет слайд по таймеру (каждые 5 с),
 * не подавая никакого признака, что смена вот-вот произойдёт: человек
 * рассматривает отзыв, и он уезжает из-под глаз. Полоса делает это состояние
 * читаемым и заодно показывает, что кнопкой паузы рядом действительно есть
 * что останавливать. Витрина лучших проектов на главной больше не использует
 * этот компонент — она стала скролл-driven липкой витриной без таймера,
 * см. {@link StickyShowcase}.
 *
 * Заполнение задаётся CSS-переменной `--carousel-progress` (0…1), которую
 * ставит извне обработчик `onAutoplayTimeLeft` Swiper — см.
 * {@link useAutoplayProgress}. Значение пишется прямо в стиль узла, минуя
 * состояние React: событие приходит каждый кадр, и ре-рендер на каждый тик
 * был бы несопоставим с пользой.
 *
 * Элемент декоративный (`aria-hidden`): смену слайда скринридеру объявляет
 * сам Swiper через свой модуль a11y, дублировать это полосой не нужно.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {React.Ref<HTMLDivElement>} props.ref - Ссылка на узел-контейнер
 * @param {string} [props.className] - Дополнительный класс-модификатор
 * @returns {JSX.Element} Полоса прогресса
 * @example
 * const { progressRef, handleAutoplayTimeLeft } = useAutoplayProgress();
 * <Swiper onAutoplayTimeLeft={handleAutoplayTimeLeft}>…</Swiper>
 * <CarouselProgress ref={progressRef} />
 */
const CarouselProgress = ({ ref, className = '' }) => (
  <div
    ref={ref}
    className={['carousel-progress', className].filter(Boolean).join(' ')}
    aria-hidden="true"
  >
    <span className="carousel-progress__bar" />
  </div>
);

export default CarouselProgress;
