import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useMediaQuery from './useMediaQuery';

/**
 * Поддельный `matchMedia`: хранит совпадения по запросам и слушателей,
 * умеет «переключать» запрос, как это делает браузер при ресайзе.
 * @returns {Object} Мок `matchMedia` и функция `setMatches(query, matches)`.
 */
const createMatchMediaMock = () => {
  const matchesByQuery = new Map();
  const listenersByQuery = new Map();

  const matchMedia = vi.fn((query) => ({
    get matches() {
      return matchesByQuery.get(query) ?? false;
    },
    media: query,
    addEventListener: vi.fn((type, listener) => {
      if (!listenersByQuery.has(query)) listenersByQuery.set(query, new Set());
      listenersByQuery.get(query).add(listener);
    }),
    removeEventListener: vi.fn((type, listener) => {
      listenersByQuery.get(query)?.delete(listener);
    }),
  }));

  const setMatches = (query, matches) => {
    matchesByQuery.set(query, matches);
    listenersByQuery.get(query)?.forEach((listener) => listener());
  };

  const listenerCount = (query) => listenersByQuery.get(query)?.size ?? 0;

  return { matchMedia, setMatches, listenerCount };
};

const TABLET_QUERY = '(max-width: 1024px)';
const PHONE_QUERY = '(max-width: 767px)';

describe('useMediaQuery', () => {
  let mock;

  beforeEach(() => {
    mock = createMatchMediaMock();
    vi.stubGlobal('matchMedia', mock.matchMedia);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('отдаёт текущее совпадение уже на первом рендере', () => {
    mock.setMatches(TABLET_QUERY, true);

    const { result } = renderHook(() => useMediaQuery(TABLET_QUERY));

    expect(result.current).toBe(true);
  });

  it('обновляет значение по событию change', () => {
    const { result } = renderHook(() => useMediaQuery(TABLET_QUERY));
    expect(result.current).toBe(false);

    act(() => mock.setMatches(TABLET_QUERY, true));
    expect(result.current).toBe(true);

    act(() => mock.setMatches(TABLET_QUERY, false));
    expect(result.current).toBe(false);
  });

  it('снимает слушатель при размонтировании', () => {
    const { unmount } = renderHook(() => useMediaQuery(TABLET_QUERY));
    expect(mock.listenerCount(TABLET_QUERY)).toBe(1);

    unmount();

    expect(mock.listenerCount(TABLET_QUERY)).toBe(0);
  });

  it('при смене запроса переподписывается и отдаёт значение нового запроса', () => {
    mock.setMatches(PHONE_QUERY, true);

    const { result, rerender } = renderHook(
      ({ query }) => useMediaQuery(query),
      {
        initialProps: { query: TABLET_QUERY },
      }
    );
    expect(result.current).toBe(false);

    rerender({ query: PHONE_QUERY });

    expect(result.current).toBe(true);
    expect(mock.listenerCount(TABLET_QUERY)).toBe(0);
    expect(mock.listenerCount(PHONE_QUERY)).toBe(1);
  });

  it('без matchMedia отдаёт false и не падает', () => {
    vi.stubGlobal('matchMedia', undefined);

    const { result } = renderHook(() => useMediaQuery(TABLET_QUERY));

    expect(result.current).toBe(false);
  });
});
