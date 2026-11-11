import { StrictMode } from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import i18n from '../utils/i18n/index';
import { LOCAL_STORAGE_KEY } from '../const';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageProvider } from './LanguageProvider';

/**
 * Показывает, что видят компоненты: язык из хука-моста, query-строку адреса и
 * кнопку переключения. Хук — тот же, что у `ToggleLang`.
 */
const Probe = () => {
  const { lang, toggleLang } = useLanguage();
  const { search } = useLocation();

  return (
    <>
      <output data-testid="lang">{lang}</output>
      <output data-testid="search">{search}</output>
      <button type="button" onClick={toggleLang}>
        toggle
      </button>
    </>
  );
};

/**
 * Рендерит провайдер языка так же, как приложение: под `StrictMode`, который
 * в тестах, как и в dev, прогоняет эффекты дважды.
 *
 * @param {string} url - Начальный адрес роутера, например '/?lang=en'.
 */
const renderLanguage = (url) =>
  render(
    <StrictMode>
      <MemoryRouter initialEntries={[url]}>
        <LanguageProvider>
          <Probe />
        </LanguageProvider>
      </MemoryRouter>
    </StrictMode>
  );

describe('LanguageProvider и хук useLanguage', () => {
  afterEach(async () => {
    localStorage.clear();
    window.history.replaceState({}, '', '/');
    await i18n.changeLanguage('ru');
  });

  it('без ?lang= и без сохранённого языка — ru, адрес получает ?lang=ru', async () => {
    renderLanguage('/');

    expect(screen.getByTestId('lang')).toHaveTextContent('ru');
    await waitFor(() =>
      expect(screen.getByTestId('search')).toHaveTextContent('?lang=ru')
    );
  });

  it('берёт язык из ?lang= и переключает на него i18next', async () => {
    renderLanguage('/?lang=en');

    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    await waitFor(() => expect(i18n.language).toBe('en'));
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe('en');
  });

  // Регресс: эффект восстановления раньше гонялся с эффектом сохранения, и
  // StrictMode сбрасывал сохранённый выбор к 'ru'.
  it('без ?lang= восстанавливает язык из localStorage и не сбрасывает его', async () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'en');

    renderLanguage('/');

    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    await waitFor(() =>
      expect(screen.getByTestId('search')).toHaveTextContent('?lang=en')
    );
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe('en');
    await waitFor(() => expect(i18n.language).toBe('en'));
  });

  it('переключение меняет язык, адрес, localStorage и i18next', async () => {
    renderLanguage('/?lang=ru');

    fireEvent.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    await waitFor(() =>
      expect(screen.getByTestId('search')).toHaveTextContent('?lang=en')
    );
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe('en');
    await waitFor(() => expect(i18n.language).toBe('en'));
  });
});
