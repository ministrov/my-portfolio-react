import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import HamburgerButton from './HamburgerButton';

/**
 * Рендерит бургер в заданном состоянии меню.
 * @param {boolean} [isOpen=false] - Открыто ли меню.
 * @returns {{ onToggle: Function, burger: HTMLElement }}
 */
const renderBurger = (isOpen = false) => {
  const onToggle = vi.fn();

  render(<HamburgerButton isOpen={isOpen} onToggle={onToggle} />);

  return {
    onToggle,
    burger: screen.getByRole('button', {
      name: isOpen ? 'Скрыть меню' : 'Показать меню',
    }),
  };
};

describe('HamburgerButton', () => {
  it('клик по закрытому бургеру просит открыть меню', () => {
    const { onToggle, burger } = renderBurger();

    fireEvent.click(burger);

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  // Контракт `useMenuControl.handleMenuToggle(toggled)`: он ставит переданное
  // значение, а не переключает. Если отдать ему объект события, меню заклинит
  // открытым — поэтому проверяется именно следующий булев статус.
  it('клик по открытому бургеру просит закрыть меню', () => {
    const { onToggle, burger } = renderBurger(true);

    fireEvent.click(burger);

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  // Клавиатуру (Enter, пробел) нативной кнопке даёт браузер; jsdom их не
  // изображает, поэтому здесь закреплены роль, тип и связь с меню, а работа
  // клавиш проверяется в браузере в T15.
  it('это нативная кнопка, связанная с меню через aria', () => {
    const { burger } = renderBurger();

    expect(burger.tagName).toBe('BUTTON');
    expect(burger).toHaveAttribute('type', 'button');
    expect(burger).toHaveAttribute('aria-expanded', 'false');
    expect(burger).toHaveAttribute('aria-controls', 'mobile-navigation-menu');
  });

  it('открытое состояние отражается в aria-expanded и подписи', () => {
    const { burger } = renderBurger(true);

    expect(burger).toHaveAttribute('aria-expanded', 'true');
    expect(burger).toHaveAccessibleName('Скрыть меню');
  });
});
