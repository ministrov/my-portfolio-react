import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '../../utils/i18n/index';
import { authorData } from '../../const';
import AuthorPhoto from './AuthorPhoto';

/**
 * Ожидаемый текст строки кода для свойства `authorData.code`: скаляр —
 * `ключ: 'значение',`, массив — `ключ: ['a', 'b'],`.
 * @param {[string, string|string[]]} entry - Пара «имя свойства — значение»
 * @returns {string} Текст строки без отступа: отступ задаёт CSS
 */
const toCodeLine = ([name, value]) =>
  Array.isArray(value)
    ? `${name}: [${value.map((item) => `'${item}'`).join(', ')}],`
    : `${name}: '${value}',`;

describe('AuthorPhoto', () => {
  it('выводит каждое свойство автора отдельной строкой кода', () => {
    const { container } = render(<AuthorPhoto />);

    const lines = [...container.querySelectorAll('.author-code__line')];

    expect(lines).toHaveLength(9);
    // Точное сравнение textContent, а не toHaveTextContent: тот схлопывает
    // пробелы и ищет подстроку — вернувшийся в строку перенос не заметит
    expect(lines.map((line) => line.textContent)).toEqual(
      Object.entries(authorData.code).map(toCodeLine)
    );
  });

  it('разбивает код на строки разметкой, а не символами перевода строки', () => {
    const { container } = render(<AuthorPhoto />);

    expect(
      container.querySelector('.author-code code').textContent
    ).not.toContain('\n');
    expect(container.querySelector('.author-code__end').textContent).toBe('};');
  });
});
