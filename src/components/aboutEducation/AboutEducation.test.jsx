import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import i18n from '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import AboutEducation from './AboutEducation';

const ITEMS_KEY = 'aboutEducation.items';

/**
 * Форма карточек без текстов: какие поля есть у каждой.
 * @param {Object[]} items - Массив `aboutEducation.items` одной локали.
 * @returns {string[][]} Для каждой карточки — отсортированные имена её полей.
 */
const shapeOf = (items) => items.map((item) => Object.keys(item).sort());

describe('AboutEducation', () => {
  it('новое сверху: PurpleSchool, курс React, HTML Academy, колледж', () => {
    render(<AboutEducation />);

    const labels = [
      'PurpleSchool',
      'Курсы профессиональной подготовки HTML Academy',
      'Онлайн-академия HTML Academy',
      'Московский колледж управления и новых технологий',
    ];
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(labels.length);
    articles.forEach((article, index) => {
      expect(within(article).getByText(labels[index])).toBeInTheDocument();
    });

    const [current] = articles;
    expect(
      within(current).getByRole('heading', { level: 3 })
    ).toHaveTextContent('Профессия Backend-разработчик на Python');
    expect(
      within(current).getByText('Июнь 2026 — настоящее время')
    ).toBeInTheDocument();
  });

  it('карточки — элементы списка секции: ul > li > article', () => {
    render(<AboutEducation />);

    screen.getAllByRole('article').forEach((article) => {
      expect(article.parentElement.tagName).toBe('LI');
      expect(article.parentElement.parentElement).toHaveClass(
        'about-education__education-list'
      );
    });
  });

  it('заголовок — «Моё образование», «Учебное заведение:» нигде нет', () => {
    const { container } = render(<AboutEducation />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Моё образование'
    );
    expect(container).not.toHaveTextContent('Учебное заведение');
  });

  it('описание — только у PurpleSchool', () => {
    const { container } = render(<AboutEducation />);

    const texts = container.querySelectorAll('.resume-card__text');
    expect(texts).toHaveLength(1);
    expect(screen.getAllByRole('article')[0]).toContainElement(texts[0]);
  });

  it('RU и EN совпадают по форме: те же карточки с теми же полями', () => {
    const ru = i18n.getResource('ru', 'translation', ITEMS_KEY);
    const en = i18n.getResource('en', 'translation', ITEMS_KEY);

    expect(shapeOf(en)).toEqual(shapeOf(ru));
  });

  it('ключ потерян (пришёл не массив) — секция рендерится без карточек и не падает', () => {
    const original = i18n.getResource('ru', 'translation', ITEMS_KEY);
    // Так i18next отвечает на отсутствующий ключ: строкой с самим ключом
    i18n.addResource('ru', 'translation', ITEMS_KEY, ITEMS_KEY);

    try {
      render(<AboutEducation />);

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.queryByRole('article')).not.toBeInTheDocument();
    } finally {
      i18n.addResource('ru', 'translation', ITEMS_KEY, original);
    }
  });
});
