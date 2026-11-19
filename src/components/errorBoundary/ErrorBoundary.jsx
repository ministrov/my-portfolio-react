import { Component } from 'react';
import ErrorFallback from './ErrorFallback';
import { isChunkLoadError, canAutoReload, autoReload } from './chunkReload';

/**
 * Граница ошибок: ловит ошибку рендера или сбой загрузки файла в своих детях
 * и вместо белого экрана показывает {@link ErrorFallback} — сообщение и кнопку
 * «Обновить страницу». Всё, что выше и рядом с границей, остаётся на месте.
 *
 * **Единственный классовый компонент в проекте** — исключение из правила
 * `CLAUDE.md`, решение владельца (S03-T10). Функционального API для перехвата
 * ошибок рендера в React нет: только `getDerivedStateFromError` и
 * `componentDidCatch` у класса. Новых зависимостей ради этого не берём.
 *
 * Сбой загрузки файла — частый случай после выкладки: вкладка, открытая до
 * неё, просит файл, которого на сервере уже нет. Тогда граница один раз за
 * сессию перезагружает вкладку сама (см. `chunkReload.js`), а экран с кнопкой
 * остаётся на случай, если перезагрузка не поможет. Обычную ошибку рендера
 * перезагрузка сама не повторяет.
 *
 * Кнопка всегда перезагружает страницу целиком, а не перерисовывает детей:
 * `lazy()` запоминает неудачную загрузку, и повторный рендер упал бы снова.
 * Сбросить границу при переходе на другой адрес — дело родителя: `key`
 * с адресом (см. `Layout.jsx`).
 *
 * Ошибку граница не логирует: React 19 сам пишет пойманные ошибки в
 * `console.error`.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {React.ReactNode} props.children - Что защищает граница
 * @param {('page'|'section')} [props.variant='page'] - Вид запасного экрана:
 *   страница с заголовком `h1` или короткий блок на месте секции
 * @returns {React.ReactNode} Дети или запасной экран
 * @example
 * <ErrorBoundary key={pathname}>
 *   <Outlet />
 * </ErrorBoundary>
 *
 * <ErrorBoundary variant="section">
 *   <Suspense fallback={<Loader />}>
 *     <Showcasing />
 *   </Suspense>
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component {
  state = { error: null, willReload: false };

  // Только вычисляет состояние: React может вызвать его несколько раз,
  // поэтому сама перезагрузка — в componentDidCatch.
  static getDerivedStateFromError(error) {
    return {
      error,
      willReload: isChunkLoadError(error) && canAutoReload(),
    };
  }

  componentDidCatch() {
    if (this.state.willReload) autoReload();
  }

  render() {
    const { error } = this.state;
    const { children, variant = 'page' } = this.props;

    if (!error) return children;

    // Экран рисуется и тогда, когда сейчас будет перезагрузка: если она не
    // случится, посетитель увидит кнопку, а не пустое место.
    return (
      <ErrorFallback variant={variant} isChunkError={isChunkLoadError(error)} />
    );
  }
}

export default ErrorBoundary;
