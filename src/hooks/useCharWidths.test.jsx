import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useCharWidths from './useCharWidths';

const TEXT = 'Middle';
/** Ширина любого символа (px) шрифтом-заменой и загруженным веб-шрифтом. */
const FALLBACK_WIDTH = 7;
const LOADED_WIDTH = 10;

let isFontLoaded = false;

/**
 * Поддельный canvas-контекст. Хук кеширует контекст на уровне модуля, поэтому
 * он один на все тесты. Ширина символа зависит только от того, «загружен» ли
 * шрифт, — как в браузере, где строка `font` до и после загрузки одна и та же.
 */
const fakeContext = {
  font: '',
  measureText: () => ({
    width: isFontLoaded ? LOADED_WIDTH : FALLBACK_WIDTH,
  }),
};

/** Пустой `ResizeObserver` для jsdom, где его нет. */
class ResizeObserverMock {
  observe() {}

  disconnect() {}
}

/**
 * Поддельный `document.fonts` (в jsdom FontFaceSet нет): `ready` выполняется
 * вручную, событие `loadingdone` отправляется вызовом `finishLoading`.
 * @returns {Object} Мок `fonts`, функции `resolveReady()`, `finishLoading()` и
 * `listenerCount()` — число подписчиков на `loadingdone`.
 */
const createFontsMock = () => {
  const listeners = new Set();
  let resolveReady;

  const fonts = {
    ready: new Promise((resolve) => {
      resolveReady = resolve;
    }),
    addEventListener: (type, listener) => {
      if (type === 'loadingdone') listeners.add(listener);
    },
    removeEventListener: (type, listener) => {
      if (type === 'loadingdone') listeners.delete(listener);
    },
  };

  const finishLoading = () => listeners.forEach((listener) => listener());
  const listenerCount = () => listeners.size;

  return { fonts, resolveReady, finishLoading, listenerCount };
};

/**
 * Ширины символов `TEXT`, если каждый символ шириной `width`.
 * @param {number} width - Ширина одного символа (px).
 * @returns {number[]} Ожидаемый ответ хука.
 */
const widthsOf = (width) => Array.from(TEXT, () => width);

describe('useCharWidths', () => {
  let getContextSpy;
  let element;
  let elementRef;

  beforeEach(() => {
    isFontLoaded = false;
    getContextSpy = vi
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockReturnValue(fakeContext);
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
    element = document.createElement('span');
    document.body.append(element);
    // Ref создаётся вне renderHook: новый объект на каждом рендере
    // перезапускал бы эффект хука
    elementRef = { current: element };
  });

  afterEach(() => {
    getContextSpy.mockRestore();
    vi.unstubAllGlobals();
    element.remove();
    delete document.fonts;
  });

  /**
   * Подкладывает мок в `document.fonts`. `vi.stubGlobal` сюда не дотягивается:
   * это свойство `document`, а не глобальная переменная.
   * @param {Object} fonts - Мок из `createFontsMock`.
   */
  const setDocumentFonts = (fonts) => {
    Object.defineProperty(document, 'fonts', {
      configurable: true,
      value: fonts,
    });
  };

  it('до загрузки шрифта отдаёт ширины шрифта-замены', () => {
    setDocumentFonts(createFontsMock().fonts);

    const { result } = renderHook(() => useCharWidths(elementRef, TEXT));

    expect(result.current).toEqual(widthsOf(FALLBACK_WIDTH));
  });

  it('после document.fonts.ready перемеряет, хотя строка font не изменилась', async () => {
    const { fonts, resolveReady } = createFontsMock();
    setDocumentFonts(fonts);
    const { result } = renderHook(() => useCharWidths(elementRef, TEXT));

    isFontLoaded = true;
    await act(async () => resolveReady(fonts));

    expect(result.current).toEqual(widthsOf(LOADED_WIDTH));
  });

  it('перемеряет по loadingdone, если шрифт начал грузиться уже после ready', async () => {
    const { fonts, resolveReady, finishLoading } = createFontsMock();
    setDocumentFonts(fonts);
    // Загрузок в очереди нет — ready выполнен ещё до монтирования
    resolveReady(fonts);
    const { result } = renderHook(() => useCharWidths(elementRef, TEXT));
    await act(async () => {});
    expect(result.current).toEqual(widthsOf(FALLBACK_WIDTH));

    isFontLoaded = true;
    act(() => finishLoading());

    expect(result.current).toEqual(widthsOf(LOADED_WIDTH));
  });

  it('снимает подписку на loadingdone при размонтировании', () => {
    const { fonts, listenerCount } = createFontsMock();
    setDocumentFonts(fonts);
    const { unmount } = renderHook(() => useCharWidths(elementRef, TEXT));
    expect(listenerCount()).toBe(1);

    unmount();

    expect(listenerCount()).toBe(0);
  });

  it('без document.fonts меряет один раз и не падает', () => {
    const { result } = renderHook(() => useCharWidths(elementRef, TEXT));

    expect(result.current).toEqual(widthsOf(FALLBACK_WIDTH));
  });
});
