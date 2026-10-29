import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import i18n from '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import AboutExperience from './AboutExperience';

const ITEMS_KEY = 'aboutExperience.items';

/**
 * Форма карточек без текстов: число этапов и пунктов в каждом этапе.
 * @param {Object[]} items - Массив `aboutExperience.items` одной локали.
 * @returns {number[][]} Для каждой карточки — число пунктов в каждом её этапе.
 */
const shapeOf = (items) =>
  items.map(({ stages = [] }) =>
    stages.map(({ points = [] }) => points.length)
  );

describe('AboutExperience', () => {
  it('первая карточка — текущая работа в «Сервис Маркет», вторая — фриланс', () => {
    render(<AboutExperience />);

    const [current, freelance] = screen.getAllByRole('article');
    expect(
      within(current).getByRole('heading', { level: 3 })
    ).toHaveTextContent('Frontend-разработчик');
    expect(
      within(current).getByText('ООО «Сервис Маркет»')
    ).toBeInTheDocument();
    expect(
      within(current).getByText('Декабрь 2023 — настоящее время')
    ).toBeInTheDocument();
    expect(
      within(freelance).getByRole('heading', { level: 3 })
    ).toHaveTextContent('Фриланс-разработчик');
  });

  it('карточки — элементы списка секции: ul > li > article', () => {
    render(<AboutExperience />);

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(2);
    articles.forEach((article) => {
      expect(article.parentElement.tagName).toBe('LI');
      expect(article.parentElement.parentElement).toHaveClass(
        'about-experience__experience-list'
      );
    });
  });

  it('у «Сервис Маркет» два этапа с датами, у каждого пункты — элементы списка', () => {
    render(<AboutExperience />);

    const [current] = screen.getAllByRole('article');
    expect(within(current).getByText('С ноября 2024')).toBeInTheDocument();
    expect(
      within(current).getByText('Декабрь 2023 — ноябрь 2024')
    ).toBeInTheDocument();

    const lists = within(current).getAllByRole('list');
    expect(lists).toHaveLength(2);
    lists.forEach((list) => {
      expect(within(list).getAllByRole('listitem')).toHaveLength(3);
    });
  });

  it('RU и EN совпадают по форме: карточки, этапы и число пунктов', () => {
    const ru = i18n.getResource('ru', 'translation', ITEMS_KEY);
    const en = i18n.getResource('en', 'translation', ITEMS_KEY);

    expect(shapeOf(en)).toEqual(shapeOf(ru));
  });

  it('ключ потерян (пришёл не массив) — секция рендерится без карточек и не падает', () => {
    const original = i18n.getResource('ru', 'translation', ITEMS_KEY);
    // Так i18next отвечает на отсутствующий ключ: строкой с самим ключом
    i18n.addResource('ru', 'translation', ITEMS_KEY, ITEMS_KEY);

    try {
      render(<AboutExperience />);

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.queryByRole('article')).not.toBeInTheDocument();
    } finally {
      i18n.addResource('ru', 'translation', ITEMS_KEY, original);
    }
  });
});
