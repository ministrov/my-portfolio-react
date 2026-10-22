import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import Up from './Up';

// Анимации не проверяются — motion заменён прозрачными обёртками, чтобы
// видимость кнопки менялась синхронно, без ожидания exit-анимации.
vi.mock('motion/react', async () => {
  const { createElement, Fragment } = await import('react');
  const passThrough = ({ children }) => createElement(Fragment, null, children);
  // eslint-disable-next-line no-unused-vars -- пропсы анимации не уходят в DOM
  const MotionButton = ({ initial, animate, exit, transition, ...rest }) =>
    createElement('button', rest);

  return {
    AnimatePresence: passThrough,
    LazyMotion: passThrough,
    domAnimation: {},
    m: { button: MotionButton },
    useReducedMotion: () => false,
  };
});

const COMPACT_QUERY = '(max-width: 1024px)';
const VIEWPORT_HEIGHT = 800; // два экрана — 1 600 px

/**
 * Поддельный `matchMedia`: совпадает только переданный запрос.
 * @param {string|null} matchingQuery - Запрос, который считается совпавшим.
 * @returns {Function} Подмена `window.matchMedia`.
 */
const createMatchMedia = (matchingQuery) =>
  vi.fn((query) => ({
    matches: query === matchingQuery,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));

/**
 * `IntersectionObserver`, которым тест сам сообщает, что блок вошёл в кадр
 * или вышел из него.
 */
const observers = [];

class IntersectionObserverStub {
  constructor(callback) {
    this.callback = callback;
    this.isConnected = true;
    observers.push(this);
  }

  observe() {}

  unobserve() {}

  disconnect() {
    this.isConnected = false;
  }
}

/**
 * Сообщает живым наблюдателям, что блок вошёл в кадр или вышел из него.
 * @param {string} selector - Селектор блока на странице.
 * @param {boolean} isIntersecting - Виден ли блок.
 */
const setInView = (selector, isIntersecting) => {
  const target = document.querySelector(selector);
  act(() => {
    observers
      .filter((observer) => observer.isConnected)
      .forEach((observer) => observer.callback([{ target, isIntersecting }]));
  });
};

/**
 * Прокручивает страницу до позиции и шлёт событие `scroll`.
 * @param {number} y - Новое значение `window.scrollY`.
 */
const scrollPage = (y) => {
  window.scrollY = y;
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
};

const queryUp = () =>
  screen.queryByRole('button', { name: 'Вернуться в начало страницы' });

/**
 * Рендерит кнопку между формой контактов и футером — блоками, поверх
 * которых она на ≤ 1024 px прячется.
 */
const renderUp = () =>
  render(
    <MemoryRouter>
      <div className="contact-form" />
      <Up />
      <footer className="main-footer" />
    </MemoryRouter>
  );

describe('Up', () => {
  beforeEach(() => {
    window.scrollY = 0;
    window.innerHeight = VIEWPORT_HEIGHT;
    observers.length = 0;
    vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
    // Кадр анимации выполняется сразу — реакция на прокрутку проверяется синхронно
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      callback(0);
      return 0;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  afterEach(() => {
    window.scrollY = 0;
    vi.unstubAllGlobals();
  });

  describe('на ≤ 1024 px', () => {
    beforeEach(() => {
      vi.stubGlobal('matchMedia', createMatchMedia(COMPACT_QUERY));
    });

    it('не появляется при прокрутке вниз', () => {
      renderUp();

      scrollPage(1000);
      scrollPage(2000);
      scrollPage(3000);

      expect(queryUp()).not.toBeInTheDocument();
    });

    it('появляется при прокрутке вверх после двух экранов и прячется при прокрутке вниз', () => {
      renderUp();

      scrollPage(3000);
      scrollPage(2900);
      expect(queryUp()).toBeInTheDocument();

      scrollPage(3000);
      expect(queryUp()).not.toBeInTheDocument();
    });

    it('не появляется при прокрутке вверх в пределах двух экранов', () => {
      renderUp();

      scrollPage(1500);
      scrollPage(1400);

      expect(queryUp()).not.toBeInTheDocument();
    });

    it('не реагирует на сдвиг до 8 px', () => {
      renderUp();

      scrollPage(3000);
      scrollPage(2992);
      expect(queryUp()).not.toBeInTheDocument();

      scrollPage(2980);
      expect(queryUp()).toBeInTheDocument();

      scrollPage(2988);
      expect(queryUp()).toBeInTheDocument();
    });

    it('скрыта, пока в кадре форма контактов или футер', () => {
      renderUp();
      scrollPage(3000);
      scrollPage(2900);

      setInView('.contact-form', true);
      expect(queryUp()).not.toBeInTheDocument();

      setInView('.contact-form', false);
      expect(queryUp()).toBeInTheDocument();

      setInView('.main-footer', true);
      expect(queryUp()).not.toBeInTheDocument();
    });
  });

  describe('на ≥ 1025 px', () => {
    beforeEach(() => {
      vi.stubGlobal('matchMedia', createMatchMedia(null));
    });

    it('как раньше: видна после 300 px прокрутки в любом направлении', async () => {
      renderUp();

      scrollPage(400);
      await waitFor(() => expect(queryUp()).toBeInTheDocument());

      scrollPage(200);
      await waitFor(() => expect(queryUp()).not.toBeInTheDocument());
    });
  });
});
