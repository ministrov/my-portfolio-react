import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import About from './About';

// Плашки фактов меряют символы через canvas и спрашивают matchMedia — в jsdom
// нет ни того, ни другого. Тест про заголовок, поэтому плашки заглушены.
vi.mock('../../components/aboutStat/AboutStat', () => ({
  default: () => null,
}));

/**
 * Рендерит секцию в роутере: хлебным крошкам нужен `Link`.
 * @param {Object} [props] - Пропсы секции About.
 * @returns {ReturnType<typeof render>} Результат рендера.
 */
const renderAbout = (props) =>
  render(
    <MemoryRouter>
      <About {...props} />
    </MemoryRouter>
  );

describe('About', () => {
  it('по умолчанию «Немного обо мне» — заголовок секции h2, как на главной', () => {
    renderAbout();

    expect(
      screen.getByRole('heading', { level: 2, name: 'Немного обо мне' })
    ).toHaveAttribute('id', 'about-heading');
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  });

  it('с headingLevel={1} «Немного обо мне» — главный заголовок страницы h1', () => {
    renderAbout({ border: true, headingLevel: 1 });

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveAccessibleName('Немного обо мне');
    expect(headings[0]).toHaveAttribute('id', 'about-heading');
  });
});
