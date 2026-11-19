import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import i18n from '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import ErrorBoundary from './ErrorBoundary';
import { RELOAD_FLAG_KEY } from './chunkReload';
import { reloadPage } from './reloadPage';

// В jsdom location.reload не работает и не подменяется — подменяем модуль
vi.mock('./reloadPage', () => ({ reloadPage: vi.fn() }));

/** Ребёнок, который падает при рендере с заданной ошибкой. */
const Boom = ({ error }) => {
  throw error;
};

const renderError = new TypeError(
  "Cannot read properties of undefined (reading 'map')"
);
const chunkError = new TypeError(
  'Failed to fetch dynamically imported module: http://localhost/assets/Showcasing-x.js'
);

/** Секция под своей границей между двумя соседями — как на главной. */
const renderSection = (error) =>
  render(
    <>
      <p>Секция до</p>
      <ErrorBoundary variant="section">
        <Boom error={error} />
      </ErrorBoundary>
      <p>Секция после</p>
    </>
  );

describe('ErrorBoundary', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.mocked(reloadPage).mockClear();
    // React пишет пойманную ошибку в console.error — в выводе тестов это шум
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    sessionStorage.clear();
    await i18n.changeLanguage('ru');
  });

  it('без ошибки рисует детей как есть', () => {
    render(
      <ErrorBoundary>
        <p>Содержимое страницы</p>
      </ErrorBoundary>
    );

    expect(screen.getByText('Содержимое страницы')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('ошибка рендера в секции: запасной экран на её месте, соседи остаются', () => {
    renderSection(renderError);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'В этом блоке случилась ошибка.'
    );
    expect(
      screen.getByRole('button', { name: 'Обновить страницу' })
    ).toBeInTheDocument();
    expect(screen.getByText('Секция до')).toBeInTheDocument();
    expect(screen.getByText('Секция после')).toBeInTheDocument();
    // У секции заголовка нет: h1 у страницы уже есть
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('ошибка рендера на странице: заголовок h1, текст и кнопка', () => {
    render(
      <ErrorBoundary>
        <Boom error={renderError} />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Что-то пошло не так' })
    ).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent(
      'На странице случилась ошибка.'
    );
    expect(
      screen.getByRole('button', { name: 'Обновить страницу' })
    ).toBeInTheDocument();
  });

  it('ошибка рендера сама страницу не перезагружает', () => {
    renderSection(renderError);

    expect(reloadPage).not.toHaveBeenCalled();
    expect(sessionStorage.getItem(RELOAD_FLAG_KEY)).toBeNull();
  });

  it('кнопка перезагружает страницу', () => {
    renderSection(renderError);

    fireEvent.click(screen.getByRole('button', { name: 'Обновить страницу' }));

    expect(reloadPage).toHaveBeenCalledTimes(1);
  });

  it('сбой загрузки файла: одна автоперезагрузка, экран с кнопкой на месте', () => {
    render(
      <ErrorBoundary>
        <Boom error={chunkError} />
      </ErrorBoundary>
    );

    expect(reloadPage).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem(RELOAD_FLAG_KEY)).toBe('1');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Страница не загрузилась' })
    ).toBeInTheDocument();
  });

  it('сбой загрузки после автоперезагрузки: без новой перезагрузки, только кнопка', () => {
    sessionStorage.setItem(RELOAD_FLAG_KEY, '1');

    renderSection(chunkError);

    expect(reloadPage).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Этот блок не загрузился'
    );
  });

  it('по-английски — тексты из en.json', async () => {
    await i18n.changeLanguage('en');
    sessionStorage.setItem(RELOAD_FLAG_KEY, '1');

    render(
      <ErrorBoundary>
        <Boom error={chunkError} />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: "The page didn't load" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Reload the page' })
    ).toBeInTheDocument();
  });
});
