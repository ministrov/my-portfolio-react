import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '../../utils/i18n/index';
import { LanguageContext } from '../../context/LanguageProvider';
import ToggleLang from './ToggleLang';

const renderToggle = ({ lang }) => {
  const toggleLang = vi.fn();

  render(
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      <ToggleLang />
    </LanguageContext.Provider>
  );

  return toggleLang;
};

describe('ToggleLang', () => {
  it('отмечает текущий язык через aria-pressed', () => {
    renderToggle({ lang: 'ru' });

    const group = screen.getByRole('group', {
      name: 'Переключить язык интерфейса',
    });
    const ru = within(group).getByRole('button', { name: 'RU' });
    const en = within(group).getByRole('button', { name: 'EN' });

    expect(ru).toHaveAttribute('aria-pressed', 'true');
    expect(en).toHaveAttribute('aria-pressed', 'false');
  });

  it('клик по неактивному языку вызывает переключение', () => {
    const toggleLang = renderToggle({ lang: 'ru' });

    fireEvent.click(screen.getByRole('button', { name: 'EN' }));

    expect(toggleLang).toHaveBeenCalledTimes(1);
  });

  it('клик по активному языку шпион не вызван', () => {
    const toggleLang = renderToggle({ lang: 'ru' });

    fireEvent.click(screen.getByRole('button', { name: 'RU' }));

    expect(toggleLang).not.toHaveBeenCalled();
  });
});
