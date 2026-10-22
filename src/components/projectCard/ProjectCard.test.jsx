import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '../../utils/i18n/index';
import ProjectCard from './ProjectCard';

/**
 * Пустой `ResizeObserver` для jsdom, где его нет. Карточка перемеряет
 * описание при каждом изменении его размера; в тесте размер задаёт подмена
 * `scrollHeight`/`clientHeight`, а первый замер идёт сразу при монтировании.
 */
class ResizeObserverStub {
  observe() {}

  disconnect() {}
}

/** Высота свёрнутого до трёх строк описания в «пикселях» подмены. */
const CLAMPED_HEIGHT = 60;

/**
 * Подменяет высоты элементов: `clientHeight` — видимая часть свёрнутого
 * описания, `scrollHeight` — полный текст. Если `fullHeight` больше
 * `CLAMPED_HEIGHT`, текст «не влезает» в три строки.
 * @param {number} fullHeight - Высота полного текста.
 */
const mockDescriptionHeight = (fullHeight) => {
  vi.spyOn(Element.prototype, 'clientHeight', 'get').mockReturnValue(
    CLAMPED_HEIGHT
  );
  vi.spyOn(Element.prototype, 'scrollHeight', 'get').mockReturnValue(
    fullHeight
  );
};

/**
 * Рендерит карточку «Вам Воды» с переданными пропсами поверх базовых.
 * @param {Object} [props] - Пропсы, которые нужно заменить.
 */
const renderCard = (props = {}) =>
  render(
    <ProjectCard
      title="Вам Вода"
      overview="Старая версия сайта была медленной, с неудобной фильтрацией товаров."
      skills={['JavaScript', 'WooCommerce']}
      img="vam-voda.webp"
      imgHeight={470}
      year="2025"
      role="Frontend Developer"
      infoTitle="projects.vamvoda.infoTitle"
      toolsTitle="projects.vamvoda.toolsTitle"
      yearText="projects.vamvoda.yearText"
      roleText="projects.vamvoda.roleText"
      demoLink="https://vam-voda.com/"
      {...props}
    />
  );

describe('ProjectCard', () => {
  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', ResizeObserverStub);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('показывает год и роль одной строкой над заголовком', () => {
    mockDescriptionHeight(CLAMPED_HEIGHT);
    renderCard();

    const meta = screen.getByRole('heading', {
      level: 3,
      name: 'Вам Вода',
    }).previousElementSibling;

    expect(meta).toHaveTextContent('2025');
    expect(meta).toHaveTextContent('Frontend Developer');
  });

  it('раскрывает и сворачивает длинное описание', () => {
    mockDescriptionHeight(CLAMPED_HEIGHT * 3);
    renderCard();

    const toggle = screen.getByRole('button', { name: 'Читать полностью' });
    const description = document.getElementById(
      toggle.getAttribute('aria-controls')
    );

    expect(description).toHaveTextContent('Старая версия сайта');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAccessibleName('Свернуть');

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAccessibleName('Читать полностью');
  });

  it('не показывает кнопку, если описание помещается в три строки', () => {
    mockDescriptionHeight(CLAMPED_HEIGHT);
    renderCard();

    expect(
      screen.queryByRole('button', { name: 'Читать полностью' })
    ).not.toBeInTheDocument();
  });

  it('без ссылки на GitHub выводит одну ссылку', () => {
    mockDescriptionHeight(CLAMPED_HEIGHT);
    renderCard();

    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(
      screen.getByRole('link', { name: 'Демо проекта Вам Вода' })
    ).toBeInTheDocument();
  });
});
