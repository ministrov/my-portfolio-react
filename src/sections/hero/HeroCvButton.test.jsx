import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import i18n from '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import HeroCvButton, { DOWNLOAD_ACK_MS } from './HeroCvButton';

/** Ссылка на резюме — по роли и доступному имени из словаря. */
const getCvLink = () => screen.getByRole('link', { name: i18n.t('hero.btn') });

/** Скрытая область, из которой скринридер слышит подтверждение. */
const getStatus = () => screen.getByRole('status');

/** Разметка иконки внутри кнопки: стрелка и галочка — разные SVG. */
const getIconMarkup = () =>
  getCvLink().querySelector('.hero__btn-icon').innerHTML;

/**
 * Сдвигает фейковые часы внутри `act`, чтобы обновление состояния по таймеру
 * успело отрисоваться.
 * @param {number} ms - На сколько миллисекунд.
 */
const advance = (ms) => act(() => vi.advanceTimersByTime(ms));

/**
 * Отменяет переход по ссылке. Обработчик кнопки при этом срабатывает, а jsdom
 * не пытается открыть PDF: навигации в нём нет, он пишет «Not implemented» и
 * ставит свой таймер, который сбил бы счёт таймеров.
 * @param {MouseEvent} event - Событие клика.
 */
const preventNavigation = (event) => event.preventDefault();

describe('HeroCvButton', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.addEventListener('click', preventNavigation);
  });

  afterEach(() => {
    document.removeEventListener('click', preventNavigation);
    vi.useRealTimers();
  });

  it('до нажатия — ссылка на PDF со стрелкой и пустая область статуса', () => {
    render(<HeroCvButton />);

    const link = getCvLink();
    expect(link).toHaveAttribute('download', 'Anton_Zhilin_CV.pdf');
    expect(link.getAttribute('href')).toMatch(/my-cv.*\.pdf/);
    expect(link).not.toHaveClass('hero__btn--acked');
    expect(getStatus()).toHaveAttribute('aria-live', 'polite');
    expect(getStatus()).toBeEmptyDOMElement();
  });

  it('нажатие показывает подтверждение: галочку и текст в role="status"', () => {
    render(<HeroCvButton />);
    const arrowMarkup = getIconMarkup();

    fireEvent.click(getCvLink());

    expect(getCvLink()).toHaveClass('hero__btn', 'hero__btn--acked');
    expect(getIconMarkup()).not.toBe(arrowMarkup);
    expect(getStatus()).toHaveTextContent(i18n.t('hero.btnDownloading'));
  });

  it('через DOWNLOAD_ACK_MS возвращается обратно', () => {
    render(<HeroCvButton />);
    const arrowMarkup = getIconMarkup();
    fireEvent.click(getCvLink());

    advance(DOWNLOAD_ACK_MS - 1);
    expect(getCvLink()).toHaveClass('hero__btn--acked');

    advance(1);
    expect(getCvLink()).not.toHaveClass('hero__btn--acked');
    expect(getIconMarkup()).toBe(arrowMarkup);
    expect(getStatus()).toBeEmptyDOMElement();
  });

  it('повторное нажатие продлевает подтверждение на полный срок', () => {
    render(<HeroCvButton />);
    fireEvent.click(getCvLink());
    advance(1000);

    fireEvent.click(getCvLink());
    expect(vi.getTimerCount()).toBe(1);

    // Первый таймер сработал бы здесь, через DOWNLOAD_ACK_MS от первого нажатия
    advance(DOWNLOAD_ACK_MS - 1);
    expect(getCvLink()).toHaveClass('hero__btn--acked');

    advance(1);
    expect(getCvLink()).not.toHaveClass('hero__btn--acked');
  });

  it('размонтирование до срабатывания таймера снимает таймер', () => {
    const { unmount } = render(<HeroCvButton />);
    const timersBefore = vi.getTimerCount();

    fireEvent.click(getCvLink());
    expect(vi.getTimerCount()).toBe(timersBefore + 1);

    unmount();

    // Таймер снят — обновлять состояние размонтированной кнопки нечему
    expect(vi.getTimerCount()).toBe(timersBefore);
  });
});
