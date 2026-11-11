import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, isInaccessible } from '@testing-library/react';
import { LazyMotion, domAnimation } from 'motion/react';
import i18n from '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import HeroSubtitle from './HeroSubtitle';
import { ANIMATION_DELAYS } from './animations';

/** Через сколько после монтирования начинается расшифровка (мс) — как в компоненте. */
const DECODE_START_MS = (ANIMATION_DELAYS.SUBTITLE + 0.15) * 1000;

/**
 * Ширина символа в поддельном шрифте (px): у каждого символа своя, чтобы
 * перепутанный индекс сразу дал чужую ширину.
 * @param {string} char - Символ.
 * @returns {number} Ширина.
 */
const widthOf = (char) => 3 + (char.codePointAt(0) % 7);

/**
 * Поддельный canvas-контекст для `useCharWidths`: в jsdom `getContext('2d')`
 * отдаёт `null`. Хук кеширует контекст на уровне модуля — объект один на все
 * тесты файла.
 */
const fakeContext = {
  font: '',
  measureText: (char) => ({ width: widthOf(char) }),
};

/** Пустой `ResizeObserver` для jsdom, где его нет. */
class ResizeObserverMock {
  observe() {}

  disconnect() {}
}

/**
 * Поддельный `matchMedia`: совпадает только переданный запрос. В jsdom его нет,
 * а `useScrambleText` зовёт его без проверки.
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
 * Рендерит подзаголовок внутри `LazyMotion`, как в герое.
 * @returns {ReturnType<typeof render>} Результат рендера.
 */
const renderSubtitle = () =>
  render(
    <LazyMotion features={domAnimation}>
      <HeroSubtitle />
    </LazyMotion>
  );

/**
 * Части подзаголовка: текст для скринридера, слой видимых глифов и сами глифы.
 * Слой берётся соседом скрытого текста, а не по `aria-hidden`, — чтобы его
 * пропажа роняла проверку, а не поиск.
 * @param {HTMLElement} container - Контейнер рендера.
 * @returns {{ readable: HTMLElement, glyphLayer: HTMLElement, chars: HTMLElement[] }}
 */
const getParts = (container) => {
  const paragraph = container.querySelector('p.hero__subtitle');
  const readable = paragraph.querySelector('.visually-hidden');

  return {
    readable,
    glyphLayer: readable.nextElementSibling,
    chars: [...paragraph.querySelectorAll('.hero__subtitle-char')],
  };
};

describe('HeroSubtitle', () => {
  let getContextSpy;

  beforeEach(() => {
    getContextSpy = vi
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockReturnValue(fakeContext);
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
    // Десктоп с мышью: (hover: none) не совпадает
    vi.stubGlobal('matchMedia', createMatchMedia(null));
  });

  afterEach(async () => {
    // i18n — синглтон модуля: возвращаем язык, чтобы тесты не влияли друг на
    // друга. Первым делом: компонент ещё смонтирован, и смена текста
    // перезапускает замер ширин — подмены canvas и ResizeObserver ему нужны
    await act(() => i18n.changeLanguage('ru'));
    vi.useRealTimers();
    getContextSpy.mockRestore();
    vi.unstubAllGlobals();
  });

  it('скринридер получает строку hero.subtitle целиком, а глифы скрыты под aria-hidden', () => {
    const text = i18n.t('hero.subtitle');
    const { container } = renderSubtitle();
    const { readable, glyphLayer, chars } = getParts(container);

    expect(screen.getByText(text)).toBe(readable);
    expect(isInaccessible(readable)).toBe(false);
    expect(glyphLayer).toHaveAttribute('aria-hidden', 'true');
    expect(chars).toHaveLength(Array.from(text).length);
    chars.forEach((char) => expect(isInaccessible(char)).toBe(true));
  });

  it('на английском скринридер получает английскую строку целиком', async () => {
    const { container } = renderSubtitle();

    await act(() => i18n.changeLanguage('en'));

    const { readable, glyphLayer } = getParts(container);
    const enText = i18n.t('hero.subtitle', { lng: 'en' });
    expect(enText).not.toBe(i18n.t('hero.subtitle', { lng: 'ru' }));
    expect(readable.textContent).toBe(enText);
    expect(glyphLayer).toHaveAttribute('aria-hidden', 'true');
  });

  it('на таче во время расшифровки скринридер по-прежнему получает полную строку', () => {
    vi.useFakeTimers();
    vi.stubGlobal('matchMedia', createMatchMedia('(hover: none)'));
    const text = i18n.t('hero.subtitle');
    const { container } = renderSubtitle();

    // Задержка старта и пара тиков: раскрыта только голова строки
    act(() => vi.advanceTimersByTime(DECODE_START_MS + 100));

    const { readable, glyphLayer, chars } = getParts(container);
    const decoding = chars.filter((char) =>
      char.classList.contains('hero__subtitle-char--decoding')
    );
    expect(decoding.length).toBeGreaterThan(0);
    expect(decoding.length).toBeLessThan(chars.length);
    expect(readable.textContent).toBe(text);
    expect(glyphLayer).toHaveAttribute('aria-hidden', 'true');
    decoding.forEach((char) => expect(isInaccessible(char)).toBe(true));
  });

  it('держит каждое слово в неразрывной обёртке, а пробелы оставляет между обёртками', () => {
    const text = i18n.t('hero.subtitle');
    const words = text.split(' ');
    const { container } = renderSubtitle();
    const { glyphLayer } = getParts(container);

    const wordEls = [...glyphLayer.querySelectorAll('.hero__subtitle-word')];
    expect(wordEls.map((el) => el.textContent)).toEqual(words);
    // Слово, пробел, слово… — пробел прямой ребёнок слоя, не внутри слова
    const sequence = [...glyphLayer.children].map((el) =>
      el.classList.contains('hero__subtitle-word') ? 'word' : el.textContent
    );
    expect(sequence).toEqual(
      words.flatMap((_, index) => (index === 0 ? ['word'] : [' ', 'word']))
    );
  });

  it('фиксирует каждому символу ширину, измеренную для него же', () => {
    const { container } = renderSubtitle();
    const { chars } = getParts(container);

    chars.forEach((char) =>
      expect(char.style.width).toBe(`${widthOf(char.textContent)}px`)
    );
  });
});
