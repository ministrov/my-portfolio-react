import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import HamburgerButton from './HamburgerButton';

/**
 * Рендерит закрытый бургер рядом с кнопкой-«пунктом меню» — местом, где
 * пользователь нажимает Enter до того, как фокус вернётся на бургер.
 * @returns {{ onToggle: Function, burger: HTMLElement, menuItem: HTMLElement }}
 */
const renderBurger = () => {
  const onToggle = vi.fn();

  render(
    <>
      <button type="button">Обо мне</button>
      <HamburgerButton isOpen={false} onToggle={onToggle} />
    </>
  );

  return {
    onToggle,
    burger: screen.getByRole('button', { name: 'Показать меню' }),
    menuItem: screen.getByRole('button', { name: 'Обо мне' }),
  };
};

describe('HamburgerButton', () => {
  it('Enter на самом бургере открывает меню', () => {
    const { onToggle, burger } = renderBurger();

    fireEvent.keyDown(burger, { key: 'Enter' });
    fireEvent.keyUp(burger, { key: 'Enter' });

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  // keydown и keyup — отдельными событиями: в браузере пункт меню срабатывает
  // на keydown, меню закрывается и возвращает фокус на бургер, и только потом
  // приходит keyup. Одиночное «нажатие» спрятало бы этот порядок.
  it('keyup Enter после keydown на пункте меню не открывает меню заново', () => {
    const { onToggle, burger, menuItem } = renderBurger();

    fireEvent.keyDown(menuItem, { key: 'Enter' });
    fireEvent.keyUp(burger, { key: 'Enter' });

    expect(onToggle).not.toHaveBeenCalled();
  });

  it('после пропущенного keyup следующий Enter на бургере снова работает', () => {
    const { onToggle, burger, menuItem } = renderBurger();

    fireEvent.keyDown(menuItem, { key: 'Enter' });
    fireEvent.keyUp(burger, { key: 'Enter' });
    fireEvent.keyDown(burger, { key: 'Enter' });
    fireEvent.keyUp(burger, { key: 'Enter' });

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
