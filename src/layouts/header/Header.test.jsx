import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import Header from './Header';

const MOBILE_MENU_QUERY = '(max-width: 767px)';

/**
 * Поддельный `matchMedia` с переключаемым совпадением — как браузер при
 * повороте планшета или зуме через 767 px.
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
 * Бургер — нативная `<button>`; подпись меняется вместе с состоянием меню,
 * поэтому ищем по обеим.
 * @returns {HTMLElement} Кнопка-бургер.
 */
const getBurger = () =>
  screen.getByRole('button', { name: /^(Показать|Скрыть) меню$/ });

/**
 * Рендерит хедер в мобильной раскладке и открывает меню кликом по бургеру.
 * Меню запоминает бургер и вернёт на него фокус при закрытии — как у
 * пользователя, который пришёл к бургеру по Tab.
 */
const renderWithOpenMenu = () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  const burger = getBurger();
  burger.focus();
  fireEvent.click(burger);
};

describe('Header', () => {
  let mediaMock;

  beforeEach(() => {
    mediaMock = createMatchMediaMock();
    mediaMock.setMatches(MOBILE_MENU_QUERY, true);
    vi.stubGlobal('matchMedia', mediaMock.matchMedia);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('закрывает меню и снимает блокировку скролла, когда раскладка перестаёт быть мобильной', () => {
    renderWithOpenMenu();

    expect(getBurger()).toHaveAttribute('aria-expanded', 'true');
    expect(document.body.style.overflow).toBe('hidden');

    act(() => mediaMock.setMatches(MOBILE_MENU_QUERY, false));

    expect(getBurger()).toHaveAttribute('aria-expanded', 'false');
    expect(document.body.style.overflow).toBe('unset');
  });

  // Меню закрывается по клику на пункт и возвращает фокус на бургер — как у
  // пользователя, который пришёл к бургеру по Tab. Клавиатурную активацию
  // нативная кнопка получает от браузера сама, в jsdom её не изобразить —
  // Enter и пробел на бургере проверяются в браузере в T15.
  it('клик по пункту меню закрывает меню и возвращает фокус на бургер', () => {
    renderWithOpenMenu();

    // «Обо мне» есть и в десктопном меню — jsdom не применяет CSS, который его прячет
    const aboutLink = within(screen.getByRole('dialog')).getByRole('link', {
      name: 'Обо мне',
    });
    fireEvent.click(aboutLink);

    expect(document.activeElement).toBe(getBurger());
    expect(getBurger()).toHaveAttribute('aria-expanded', 'false');
  });
});
