import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import StickyShowcase from './StickyShowcase';

// motion кэширует prefers-reduced-motion на уровне модуля при первом чтении —
// значение подменяется напрямую, чтобы тесты не зависели от порядка запуска.
const reducedMotion = vi.hoisted(() => ({ current: false }));

vi.mock('motion/react', () => ({
  useReducedMotion: () => reducedMotion.current,
}));

const TOUCH_LAYOUT_QUERY = '(max-width: 1024px), (hover: none)';
const PINNED_CLASS = 'sticky-showcase-pinned';

/**
 * Поддельный `matchMedia` с переключаемым совпадением — как браузер при
 * повороте планшета через 1024 px.
 * @returns {{ matchMedia: Function, setMatches: (query: string, matches: boolean) => void }}
 */
const createMatchMediaMock = () => {
  const matchesByQuery = new Map();
  const listenersByQuery = new Map();

  const matchMedia = vi.fn((query) => ({
    get matches() {
      return matchesByQuery.get(query) ?? false;
    },
    media: query,
    addEventListener: (type, listener) => {
      if (!listenersByQuery.has(query)) listenersByQuery.set(query, new Set());
      listenersByQuery.get(query).add(listener);
    },
    removeEventListener: (type, listener) => {
      listenersByQuery.get(query)?.delete(listener);
    },
  }));

  const setMatches = (query, matches) => {
    matchesByQuery.set(query, matches);
    listenersByQuery.get(query)?.forEach((listener) => listener());
  };

  return { matchMedia, setMatches };
};

/**
 * Задаёт геометрию «витрина закреплена»: обёртка в 4 экрана, вьюпорт в один,
 * верх обёртки ушёл на 500 px выше экрана. В jsdom все размеры нулевые, и
 * липкая ветка иначе никогда не закрепляется.
 */
const mockPinnedGeometry = () => {
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(
    function getOffsetHeight() {
      return this.classList.contains('sticky-showcase') ? 4000 : 1000;
    }
  );
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
    top: -500,
  });
};

const renderShowcase = () =>
  render(
    <MemoryRouter>
      <StickyShowcase />
    </MemoryRouter>
  );

describe('StickyShowcase', () => {
  let mediaMock;

  beforeEach(() => {
    mediaMock = createMatchMediaMock();
    vi.stubGlobal('matchMedia', mediaMock.matchMedia);
    // Кадр анимации выполняется сразу — пересчёт скролла проверяется синхронно
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      callback(0);
      return 0;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  afterEach(() => {
    reducedMotion.current = false;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('на десктопе с мышью — липкая витрина, закреплённая прячет хедер', () => {
    mockPinnedGeometry();

    renderShowcase();

    expect(
      screen.getByRole('region', { name: 'Витрина лучших проектов' })
    ).toBeInTheDocument();
    expect(document.body).toHaveClass(PINNED_CLASS);
  });

  it('на ≤ 1024 px и на таче — лента, класс на <body> не появляется', () => {
    mediaMock.setMatches(TOUCH_LAYOUT_QUERY, true);
    mockPinnedGeometry();

    renderShowcase();

    expect(
      screen.getByRole('region', { name: 'Лучшие проекты' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('region', { name: 'Витрина лучших проектов' })
    ).not.toBeInTheDocument();
    expect(document.body).not.toHaveClass(PINNED_CLASS);
  });

  it('поворот в ленту, пока витрина закреплена, снимает класс с <body>', () => {
    mockPinnedGeometry();
    renderShowcase();
    expect(document.body).toHaveClass(PINNED_CLASS);

    act(() => mediaMock.setMatches(TOUCH_LAYOUT_QUERY, true));

    expect(
      screen.getByRole('region', { name: 'Лучшие проекты' })
    ).toBeInTheDocument();
    expect(document.body).not.toHaveClass(PINNED_CLASS);
  });

  it('поворот обратно на десктоп возвращает липкую витрину', () => {
    mediaMock.setMatches(TOUCH_LAYOUT_QUERY, true);
    mockPinnedGeometry();
    renderShowcase();

    act(() => mediaMock.setMatches(TOUCH_LAYOUT_QUERY, false));

    expect(
      screen.getByRole('region', { name: 'Витрина лучших проектов' })
    ).toBeInTheDocument();
    expect(document.body).toHaveClass(PINNED_CLASS);
  });

  it('reduced motion важнее тача — статичный список вместо ленты', () => {
    reducedMotion.current = true;
    mediaMock.setMatches(TOUCH_LAYOUT_QUERY, true);
    mockPinnedGeometry();

    renderShowcase();

    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(
      screen.queryByRole('region', { name: 'Лучшие проекты' })
    ).not.toBeInTheDocument();
    expect(document.body).not.toHaveClass(PINNED_CLASS);
  });
});
