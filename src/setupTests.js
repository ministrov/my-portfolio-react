// Подключает матчеры jest-dom (toBeInTheDocument, toHaveAttribute и прочие)
// ко всем тестам. Файл указан в `test.setupFiles` в vite.config.js.
import '@testing-library/jest-dom/vitest';

/**
 * Пустой `IntersectionObserver` для jsdom, где его нет: компоненты, которые
 * следят за появлением в кадре (`whileInView` из motion, кнопка «↑»), иначе
 * падают при монтировании. Пересечений он не сообщает — тест, которому они
 * важны, подменяет его своим через `vi.stubGlobal`; `vi.unstubAllGlobals()`
 * вернёт этот.
 */
class IntersectionObserverMock {
  constructor(callback, options = {}) {
    this.callback = callback;
    this.root = options.root ?? null;
    this.rootMargin = options.rootMargin ?? '0px';
    this.thresholds = [].concat(options.threshold ?? 0);
  }

  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords() {
    return [];
  }
}

if (typeof window.IntersectionObserver === 'undefined') {
  window.IntersectionObserver = IntersectionObserverMock;
}
