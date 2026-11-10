import UpButton from './UpButton';
import useMediaQuery from '../../hooks/useMediaQuery';

/** Планшет и телефон: здесь «↑» появляется только при прокрутке вверх. */
const COMPACT_QUERY = '(max-width: 1024px)';

/**
 * Кнопка «Наверх» (scroll-to-top): появляется при прокрутке страницы и плавно
 * ведёт к её началу, Esc её прячет.
 *
 * Настроек нет: кнопка одна на сайт, в `Layout`, и вызывается без пропсов.
 * Значения — константы в `UpButton`. Сам `Up` только выбирает раскладку по
 * `COMPACT_QUERY` и пересоздаёт кнопку при её смене (`key`):
 * - **≥ 1025 px** — видна после `SCROLL_THRESHOLD` px прокрутки;
 * - **≤ 1024 px** — не закрывает текст при чтении: появляется только при
 *   прокрутке вверх после двух экранов и прячется, пока в кадре форма
 *   контактов или футер (подробно — в `UpButton`).
 *
 * @component
 * @returns {JSX.Element} Кнопка «Наверх» в текущей раскладке.
 *
 * @example
 * <Up />
 */
const Up = () => {
  const isCompact = useMediaQuery(COMPACT_QUERY);

  return (
    <UpButton key={isCompact ? 'compact' : 'desktop'} isCompact={isCompact} />
  );
};

export default Up;
