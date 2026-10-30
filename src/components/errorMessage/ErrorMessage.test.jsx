import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import i18n from '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import ErrorMessage from './ErrorMessage';
import PageNotFound from '../../pages/pageNotFound/PageNotFound';

/**
 * Рендерит компонент по заданному адресу. Адрес передаётся так, как его
 * отдаёт браузер, — в percent-кодировке: только тогда тест проверяет
 * декодирование, а не уже читаемую строку.
 * @param {string} entry - Адрес в истории роутера.
 * @param {JSX.Element} [ui] - Что рендерить; по умолчанию `ErrorMessage`.
 * @returns {ReturnType<typeof render>} Результат рендера.
 */
const renderAt = (entry, ui = <ErrorMessage />) =>
  render(<MemoryRouter initialEntries={[entry]}>{ui}</MemoryRouter>);

/**
 * Текст адреса в абзаце — содержимое `.not-found__path`.
 * @param {HTMLElement} container - Корень рендера.
 * @returns {string | undefined} Показанный адрес.
 */
const shownPath = (container) =>
  container.querySelector('.not-found__path')?.textContent;

describe('ErrorMessage', () => {
  afterEach(async () => {
    await act(() => i18n.changeLanguage('ru'));
  });

  it('на странице 404 ровно один h1, без role="alert" и вложенной секции', () => {
    const { container } = renderAt('/no-such-page', <PageNotFound />);

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Страница не найдена');
    expect(headings[0]).not.toHaveClass('visually-hidden');

    const sections = container.querySelectorAll('section');
    expect(sections).toHaveLength(1);
    expect(sections[0]).toHaveAttribute('aria-labelledby', headings[0].id);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('кириллический адрес показан читаемо, а не в percent-кодировке', () => {
    const { container } = renderAt(encodeURI('/страница'));

    expect(shownPath(container)).toBe('/страница');
    expect(container.querySelector('.not-found__text')).toHaveTextContent(
      'По адресу /страница ничего нет. Возможно, ссылка устарела или в адресе опечатка.'
    );
    expect(container.textContent).not.toMatch(/%D1/i);
  });

  it.each(['/100%', '/%E0%A4%A'])(
    'адрес с битой percent-последовательностью %s не роняет компонент и показан как есть',
    (entry) => {
      const { container } = renderAt(entry);

      expect(shownPath(container)).toBe(entry);
      expect(
        screen.getByRole('heading', { level: 1, name: 'Страница не найдена' })
      ).toBeInTheDocument();
    }
  );

  it('разметка, пришедшая в адресе, показана текстом и не роняет компонент', () => {
    const hostile = `/<path style="x">boom</path>&<img src=x onerror=alert(1)>'`;
    const { container } = renderAt(encodeURI(hostile));

    expect(shownPath(container)).toBe(hostile);
    expect(container.querySelectorAll('.not-found__path')).toHaveLength(1);
    expect(container.querySelectorAll('img')).toHaveLength(1);
  });

  // Trans интерполирует текст внутри <path> ещё раз — уже сырым значением,
  // поэтому `/{{path}}` показывается как `//{{path}}`. Это принятая косметика;
  // важно одно: компонент не падает и показывает адрес.
  it('плейсхолдер {{path}} в самом адресе не роняет компонент', () => {
    const { container } = renderAt(encodeURI('/{{path}}'));

    expect(shownPath(container)).toContain('{{path}}');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Страница не найдена' })
    ).toBeInTheDocument();
  });

  it('«На главную» ведёт на /, «Смотреть проекты» — на /projects', () => {
    renderAt('/no-such-page');

    expect(screen.getByRole('link', { name: 'На главную' })).toHaveAttribute(
      'href',
      '/'
    );

    const projects = screen.getByRole('link', { name: 'Смотреть проекты' });
    expect(projects).toHaveAttribute('href', '/projects');
    expect(screen.getByText('→')).toHaveAttribute('aria-hidden', 'true');
  });

  it('робот декоративный, грузится сразу и резервирует место', () => {
    const { container } = renderAt('/no-such-page');
    const robot = container.querySelector('.not-found__image');

    expect(robot).toHaveAttribute('alt', '');
    expect(robot).toHaveAttribute('width', '400');
    expect(robot).toHaveAttribute('height', '400');
    expect(robot).toHaveAttribute('fetchpriority', 'high');
    expect(robot).not.toHaveAttribute('loading');
  });

  it('в английской версии те же ключи: заголовок, адрес и подписи кнопок', async () => {
    await act(() => i18n.changeLanguage('en'));
    const { container } = renderAt(encodeURI('/старая-ссылка'));

    expect(
      screen.getByRole('heading', { level: 1, name: 'Page not found' })
    ).toBeInTheDocument();
    expect(container.querySelector('.not-found__text')).toHaveTextContent(
      'There is nothing at /старая-ссылка. The link may be outdated, or the address has a typo.'
    );
    expect(
      screen.getByRole('link', { name: 'Go to homepage' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'View projects' })
    ).toBeInTheDocument();
  });
});
