import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import CtaButton from './CtaButton';

/**
 * Рендерит кнопку рядом с секцией контактов — целью её скролла.
 * В jsdom нет `scrollIntoView`, поэтому он подменяется моком прямо на элементе.
 * @param {Object} [props] - Пропсы CtaButton.
 * @returns {{ contact: HTMLElement, button: HTMLElement }} Секция контактов и кнопка.
 */
const renderWithContact = (props) => {
  const { container } = render(
    <>
      <CtaButton {...props} />
      <section className="contact" />
    </>
  );
  const contact = container.querySelector('.contact');
  contact.scrollIntoView = vi.fn();

  return { contact, button: screen.getByRole('button') };
};

describe('CtaButton', () => {
  beforeEach(() => {
    // Кадр анимации выполняется сразу — скролл проверяется синхронно
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      callback(0);
      return 0;
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('по умолчанию — пилюля с подписью «Обсудить проект»', () => {
    render(<CtaButton />);

    const button = screen.getByRole('button', { name: /Обсудить проект/ });
    expect(button).toHaveClass('cta-button', 'cta-button--pill');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('вариант outline ставит модификатор и сохраняет класс-микс родителя', () => {
    render(<CtaButton variant="outline" className="hero__secondary-cta" />);

    const button = screen.getByRole('button', { name: /Обсудить проект/ });
    expect(button).toHaveClass(
      'cta-button',
      'cta-button--outline',
      'hero__secondary-cta'
    );
    expect(button).not.toHaveClass('cta-button--pill');
  });

  it('показывает переданную подпись вместо подписи по умолчанию', () => {
    render(<CtaButton label="Написать" />);

    expect(
      screen.getByRole('button', { name: /Написать/ })
    ).toBeInTheDocument();
  });

  it('стрелка скрыта от скринридера', () => {
    render(<CtaButton />);

    expect(screen.getByText('→')).toHaveAttribute('aria-hidden', 'true');
  });

  it('по клику плавно прокручивает к секции контактов', () => {
    const { contact, button } = renderWithContact({ variant: 'outline' });

    fireEvent.click(button);

    expect(contact.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(contact.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    });
  });

  it('вызывает внешний колбэк раньше скролла', () => {
    const calls = [];
    const handleClick = vi.fn(() => calls.push('onClick'));
    const { contact, button } = renderWithContact({ onClick: handleClick });
    contact.scrollIntoView.mockImplementation(() => calls.push('scroll'));

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(calls).toEqual(['onClick', 'scroll']);
  });

  it('без секции контактов на странице клик не падает', () => {
    render(<CtaButton variant="outline" />);

    expect(() => fireEvent.click(screen.getByRole('button'))).not.toThrow();
  });
});
