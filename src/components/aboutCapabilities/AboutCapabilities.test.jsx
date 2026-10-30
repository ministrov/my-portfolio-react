import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import i18n from '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import { STACK_GROUPS } from '../../const';
import AboutCapabilities from './AboutCapabilities';

// Чипы в jsdom остаются на opacity: 0 — заглушка IntersectionObserver из
// setupTests.js не сообщает о пересечении, и whileInView не срабатывает.
// На запросы по ролям и тексту это не влияет: элементы в DOM есть.

/**
 * Пары «подпись — описание» списка: прямые дети `dl`.
 * @param {HTMLElement} container - Корень отрисовки теста.
 * @returns {HTMLElement[]} Обёртки `div` каждой группы по порядку.
 */
const groupsOf = (container) => [...container.querySelector('dl').children];

describe('AboutCapabilities', () => {
  it('заголовок — «Мой стек», абзаца нет', () => {
    const { container } = render(<AboutCapabilities />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Мой стек'
    );
    expect(container.querySelector('p')).toBeNull();
  });

  it('разметка — dl > div > dt + dd, в каждом dd список чипов', () => {
    const { container } = render(<AboutCapabilities />);

    const groups = groupsOf(container);
    expect(groups).toHaveLength(STACK_GROUPS.length);
    groups.forEach((group, index) => {
      expect(group.tagName).toBe('DIV');
      expect([...group.children].map((el) => el.tagName)).toEqual(['DT', 'DD']);

      const list = within(group.children[1]).getByRole('list');
      expect(
        within(list)
          .getAllByRole('listitem')
          .map((item) => item.textContent)
      ).toEqual(STACK_GROUPS[index].items);
    });
  });

  it('пять групп по порядку: основной стек, вёрстка, качество, также, изучаю', () => {
    const { container } = render(<AboutCapabilities />);

    // Регистр словарный: прописными подписи делает только CSS
    expect(
      groupsOf(container).map((group) => group.children[0].textContent)
    ).toEqual([
      'Основной стек',
      'Вёрстка',
      'Качество',
      'Также работал с',
      'Изучаю',
    ]);
  });

  it('имена технологий — как на всём сайте: jQuery, RTK Query, Next.js', () => {
    render(<AboutCapabilities />);

    const chips = screen
      .getAllByRole('listitem')
      .map((item) => item.textContent);
    expect(chips).toEqual(
      expect.arrayContaining(['jQuery', 'RTK Query', 'Next.js'])
    );
    // Прежние написания не должны вернуться отдельными чипами
    ['JQuery', 'RTK', 'Next'].forEach((name) => {
      expect(chips).not.toContain(name);
    });
  });

  it('доступное имя «Стек технологий» — у всего dl', () => {
    const { container } = render(<AboutCapabilities />);

    expect(container.querySelector('dl')).toHaveAttribute(
      'aria-label',
      'Стек технологий'
    );
  });

  it('у каждой группы STACK_GROUPS есть подпись в RU и в EN', () => {
    ['ru', 'en'].forEach((lng) => {
      STACK_GROUPS.forEach(({ key }) => {
        const label = i18n.getResource(
          lng,
          'translation',
          `aboutCapabilities.groups.${key}`
        );
        expect(typeof label).toBe('string');
        expect(label.trim()).not.toBe('');
      });
    });
  });

  it('абзаца «Мои возможности» в словарях больше нет', () => {
    ['ru', 'en'].forEach((lng) => {
      expect(
        i18n.getResource(lng, 'translation', 'aboutCapabilities.text')
      ).toBeUndefined();
    });
  });
});
