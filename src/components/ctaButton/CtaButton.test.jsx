import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import CtaButton from './CtaButton';

// motion кэширует prefers-reduced-motion на уровне модуля при первом чтении —
// значение подменяется напрямую, остальное в модуле настоящее.
const reducedMotion = vi.hoisted(() => ({ current: false }));

vi.mock('motion/react', async (importOriginal) => ({
  ...(await importOriginal()),
  useReducedMotion: () => reducedMotion.current,
}));

/**
 * Выводит текущий адрес роутера — по нему видно, был ли переход.
 * @returns {JSX.Element} Адрес в `data-testid="location"`.
 */
const LocationProbe = () => {
  const { pathname, hash } = useLocation();
  return <output data-testid="location">{pathname + hash}</output>;
};

/**
 * Рендерит кнопку в роутере на странице `/no-such-page`: роутер нужен
 * переходу к контактам. С `withContacts` рядом лежит заголовок контактов —
 * цель прокрутки; в jsdom нет `scrollIntoView`, поэтому он подменяется моком
 * прямо на элементе.
 * @param {Object} [props] - Пропсы CtaButton.
 * @param {Object} [options]
 * @param {boolean} [options.withContacts=false] - Есть ли на странице заголовок контактов.
 * @returns {{ heading: HTMLElement | null, button: HTMLElement }} Заголовок и кнопка.
 */
const renderButton = (props, { withContacts = false } = {}) => {
  render(
    <MemoryRouter initialEntries={['/no-such-page']}>
      <CtaButton {...props} />
      {withContacts && <h2 id="contact-heading">Свяжитесь со мной</h2>}
      <LocationProbe />
    </MemoryRouter>
  );

  const heading = document.getElementById('contact-heading');
  if (heading) heading.scrollIntoView = vi.fn();

  return { heading, button: screen.getByRole('button') };
};

describe('CtaButton', () => {
  beforeEach(() => {
    // Кадр анимации выполняется сразу — переход проверяется синхронно
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      callback(0);
      return 0;
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    reducedMotion.current = false;
  });

  it('по умолчанию — пилюля с подписью «Обсудить проект»', () => {
    const { button } = renderButton();

    expect(button).toHaveAccessibleName(/Обсудить проект/);
    expect(button).toHaveClass('cta-button', 'cta-button--pill');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('вариант outline ставит модификатор и сохраняет класс-микс родителя', () => {
    const { button } = renderButton({
      variant: 'outline',
      className: 'hero__secondary-cta',
    });

    expect(button).toHaveClass(
      'cta-button',
      'cta-button--outline',
      'hero__secondary-cta'
    );
    expect(button).not.toHaveClass('cta-button--pill');
  });

  it('показывает переданную подпись вместо подписи по умолчанию', () => {
    const { button } = renderButton({ label: 'Написать' });

    expect(button).toHaveAccessibleName(/Написать/);
  });

  it('стрелка скрыта от скринридера', () => {
    renderButton();

    expect(screen.getByText('→')).toHaveAttribute('aria-hidden', 'true');
  });

  it('контакты на странице есть — плавно прокручивает к ним, адрес прежний', () => {
    const { heading, button } = renderButton(
      { variant: 'outline' },
      { withContacts: true }
    );

    fireEvent.click(button);

    expect(heading.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(heading.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    });
    expect(screen.getByTestId('location')).toHaveTextContent('/no-such-page');
  });

  it('при reduced motion прокручивает к контактам без анимации', () => {
    reducedMotion.current = true;
    const { heading, button } = renderButton({}, { withContacts: true });

    fireEvent.click(button);

    expect(heading.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto' });
  });

  it('контактов на странице нет (404) — ведёт на главную к контактам', () => {
    const { button } = renderButton({ variant: 'pill' });

    fireEvent.click(button);

    expect(screen.getByTestId('location')).toHaveTextContent(
      '/#contact-heading'
    );
  });

  it('вызывает внешний колбэк раньше скролла', () => {
    const calls = [];
    const handleClick = vi.fn(() => calls.push('onClick'));
    const { heading, button } = renderButton(
      { onClick: handleClick },
      { withContacts: true }
    );
    heading.scrollIntoView.mockImplementation(() => calls.push('scroll'));

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(calls).toEqual(['onClick', 'scroll']);
  });
});
