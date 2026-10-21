import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import MobileMenu from './MobileMenu';

// motion кэширует prefers-reduced-motion на уровне модуля при первом чтении —
// значение подменяется напрямую. Мок частичный: LazyMotion, m и
// AnimatePresence нужны меню настоящими.
const reducedMotion = vi.hoisted(() => ({ current: false }));

vi.mock('motion/react', async (importOriginal) => ({
  ...(await importOriginal()),
  useReducedMotion: () => reducedMotion.current,
}));

/**
 * Рендерит открытое меню рядом с заголовком контактов — целью прокрутки
 * «Контактов». В jsdom нет `scrollIntoView`, поэтому он подменяется моком
 * прямо на элементе. Роутер нужен пунктам-маршрутам (`NavLink`).
 * @param {Object} [options]
 * @param {boolean} [options.withContacts=true] - Есть ли на странице секция контактов.
 * @returns {{ onClose: Function, heading: HTMLElement | null }} Колбэк закрытия и заголовок.
 */
const renderMenu = ({ withContacts = true } = {}) => {
  const onClose = vi.fn();

  render(
    <MemoryRouter>
      <MobileMenu isOpen onClose={onClose} />
      {withContacts && <h2 id="contact-heading">Связаться</h2>}
    </MemoryRouter>
  );

  const heading = document.getElementById('contact-heading');
  if (heading) heading.scrollIntoView = vi.fn();

  return { onClose, heading };
};

describe('MobileMenu', () => {
  afterEach(() => {
    reducedMotion.current = false;
  });

  it('закрытое меню ничего не рендерит', () => {
    render(
      <MemoryRouter>
        <MobileMenu isOpen={false} onClose={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('показывает пункты «Обо мне», «Проекты», «Контакты» в этом порядке', () => {
    renderMenu();

    const links = within(screen.getByRole('list')).getAllByRole('link');

    expect(links.map((link) => link.textContent)).toEqual([
      'Обо мне',
      'Проекты',
      'Контакты',
    ]);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/about',
      '/projects',
      '#contact-heading',
    ]);
  });

  it('шеврон пункта декоративный и не попадает в доступное имя ссылки', () => {
    renderMenu();

    const links = within(screen.getByRole('list')).getAllByRole('link');

    links.forEach((link) => {
      expect(link).toHaveAccessibleName(link.textContent);
      expect(link.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('подпись «Язык сайта» стоит перед переключателем и не меняет его доступное имя', () => {
    renderMenu();

    const label = screen.getByText('Язык сайта');
    const toggle = screen.getByRole('button', {
      name: 'Переключить язык интерфейса',
    });

    expect(
      label.compareDocumentPosition(toggle) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it('ссылка «Скачать резюме» скачивает PDF и стоит перед «Обсудить проект»', () => {
    renderMenu();

    const cvLink = screen.getByRole('link', { name: 'Скачать резюме' });
    const cta = screen.getByRole('button', { name: /Обсудить проект/ });

    expect(cvLink).toHaveAttribute('download', 'Anton_Zhilin_CV.pdf');
    expect(cvLink.getAttribute('href')).toMatch(/my-cv.*\.pdf/);
    expect(cta).toHaveClass('cta-button--outline');
    expect(
      cvLink.compareDocumentPosition(cta) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it('«Контакты» закрывают меню, а в следующем кадре плавно прокручивают к заголовку', async () => {
    const { onClose, heading } = renderMenu();

    // fireEvent возвращает false, если обработчик отменил переход по якорю
    const notPrevented = fireEvent.click(
      screen.getByRole('link', { name: 'Контакты' })
    );

    expect(notPrevented).toBe(false);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(heading.scrollIntoView).not.toHaveBeenCalled();

    await waitFor(() =>
      expect(heading.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
      })
    );
  });

  it('при reduced motion прокручивает к контактам без анимации', async () => {
    reducedMotion.current = true;
    const { heading } = renderMenu();

    fireEvent.click(screen.getByRole('link', { name: 'Контакты' }));

    await waitFor(() =>
      expect(heading.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto' })
    );
  });

  it('без секции контактов на странице клик закрывает меню и не падает', () => {
    const { onClose } = renderMenu({ withContacts: false });

    expect(() =>
      fireEvent.click(screen.getByRole('link', { name: 'Контакты' }))
    ).not.toThrow();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
