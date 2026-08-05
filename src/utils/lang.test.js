import { describe, it, expect, beforeEach } from 'vitest';
import { resolveInitialLang, getStoredLang } from './lang';
import { LOCAL_STORAGE_KEY } from '../const';

/**
 * Подменяет query-строку, не перезагружая jsdom-окно.
 * @param {string} search - Строка вида '?lang=en' или ''.
 */
const setSearch = (search) => {
  window.history.replaceState({}, '', '/' + search);
};

describe('resolveInitialLang', () => {
  beforeEach(() => {
    localStorage.clear();
    setSearch('');
  });

  it('без URL-параметра и без localStorage отдаёт ru', () => {
    expect(resolveInitialLang()).toBe('ru');
  });

  it('берёт язык из URL-параметра', () => {
    setSearch('?lang=en');
    expect(resolveInitialLang()).toBe('en');
  });

  it('URL-параметр важнее localStorage', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'ru');
    setSearch('?lang=en');
    expect(resolveInitialLang()).toBe('en');
  });

  // Регрессия на риск Р5: язык, выбранный пользователем, обязан переживать
  // заход на адрес без ?lang=. Раньше это ломала гонка эффектов в
  // LanguageProvider — восстановление читало localStorage уже затёртым.
  it('без URL-параметра восстанавливает язык из localStorage', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'en');
    expect(resolveInitialLang()).toBe('en');
  });

  it('игнорирует мусор в URL и откатывается к сохранённому языку', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'en');
    setSearch('?lang=klingon');
    expect(resolveInitialLang()).toBe('en');
  });

  it('игнорирует мусор в localStorage и откатывается к ru', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'klingon');
    expect(resolveInitialLang()).toBe('ru');
  });
});

describe('getStoredLang', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('отдаёт null, когда ничего не сохранено', () => {
    expect(getStoredLang()).toBeNull();
  });

  it('отдаёт null на невалидное значение', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'klingon');
    expect(getStoredLang()).toBeNull();
  });

  it('отдаёт сохранённый валидный язык', () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'en');
    expect(getStoredLang()).toBe('en');
  });
});
