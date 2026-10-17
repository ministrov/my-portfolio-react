import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import { projects } from '../../sections/projects/projects';
import ShowcaseCarousel from './ShowcaseCarousel';

// motion кэширует prefers-reduced-motion на уровне модуля при первом чтении —
// значение подменяется напрямую, чтобы тесты не зависели от порядка запуска.
const reducedMotion = vi.hoisted(() => ({ current: false }));

vi.mock('motion/react', () => ({
  useReducedMotion: () => reducedMotion.current,
}));

const bestProjects = projects.filter((item) => item.isBest);

/** Геометрия ленты на 360 px: слайды по 272 px через 12 px, отступ трека 16 px. */
const PHONE = {
  offsets: [16, 300, 584, 868],
  clientWidth: 360,
  scrollWidth: 1156,
};

/** Геометрия на 1024 px: слайды по 520 px — соседний виден на 91%. */
const TABLET_1024 = {
  offsets: [16, 548, 1080, 1612],
  clientWidth: 1024,
  scrollWidth: 2148,
};

/**
 * Рендерит ленту и задаёт трекам и слайдам геометрию, которой в jsdom нет:
 * `offsetLeft` слайдов, размеры трека и его `scrollLeft`, мок `scrollTo`.
 * @param {{ offsets: number[], clientWidth: number, scrollWidth: number }} [geometry]
 * @returns {{ track: HTMLElement, scrollTrackTo: (left: number) => void }}
 *   Трек и функция, которая прокручивает его и шлёт событие `scroll`.
 */
const renderCarousel = (geometry = PHONE) => {
  const { container } = render(
    <MemoryRouter>
      <ShowcaseCarousel projects={bestProjects} />
    </MemoryRouter>
  );

  const track = container.querySelector('.showcase-carousel__track');
  track.scrollTo = vi.fn();
  Object.defineProperties(track, {
    clientWidth: { configurable: true, value: geometry.clientWidth },
    scrollWidth: { configurable: true, value: geometry.scrollWidth },
    scrollLeft: { configurable: true, writable: true, value: 0 },
  });

  screen.getAllByRole('group').forEach((slide, index) => {
    Object.defineProperty(slide, 'offsetLeft', {
      configurable: true,
      value: geometry.offsets[index],
    });
  });

  const scrollTrackTo = (left) => {
    track.scrollLeft = left;
    fireEvent.scroll(track);
  };

  return { track, scrollTrackTo };
};

/**
 * Счётчик ищется по классу, а не по тексту: «/ 04» лежит в отдельном `span`,
 * а `getByText` смотрит только собственный текст узла.
 * @returns {HTMLElement} Счётчик «01 / 04».
 */
const getCounter = () => document.querySelector('.showcase-carousel__counter');

/** @returns {HTMLElement[]} Точки-переключатели в порядке слайдов. */
const getDots = () =>
  screen.getAllByRole('button', { name: /Перейти к проекту/ });

describe('ShowcaseCarousel', () => {
  afterEach(() => {
    reducedMotion.current = false;
  });

  describe('разметка', () => {
    it('карусель — регион с локализованными подписью и ролью', () => {
      renderCarousel();

      const region = screen.getByRole('region', { name: 'Лучшие проекты' });
      expect(region).toHaveAttribute('aria-roledescription', 'карусель');
    });

    it('рендерит четыре слайда с подписями «N из 4: проект»', () => {
      renderCarousel();

      const slides = screen.getAllByRole('group');
      expect(slides).toHaveLength(4);
      expect(slides.map((slide) => slide.getAttribute('aria-label'))).toEqual([
        '1 из 4: Вам Вода',
        '2 из 4: ВодаОнлайн',
        '3 из 4: Диджитал студия Area',
        '4 из 4: Mish',
      ]);
      slides.forEach((slide) => {
        expect(slide).toHaveAttribute('aria-roledescription', 'слайд');
      });
    });

    it('в слайде — заголовок h3, строка «год · роль» и слоган', () => {
      renderCarousel();

      const slide = screen.getByRole('group', { name: '1 из 4: Вам Вода' });
      expect(
        within(slide).getByRole('heading', { level: 3, name: 'Вам Вода' })
      ).toBeInTheDocument();
      expect(within(slide).getByText('2025')).toBeInTheDocument();
      expect(within(slide).getByText('Frontend Developer')).toBeInTheDocument();
      expect(
        within(slide).getByText(
          'Современная E-Commerce платформа для продажи воды'
        )
      ).toBeInTheDocument();
    });

    it('пустой слоган не оставляет пустого абзаца', () => {
      const { track } = renderCarousel();

      const mish = screen.getByRole('group', { name: '4 из 4: Mish' });
      expect(mish.querySelector('.showcase-carousel__slogan')).toBeNull();
      expect(track.querySelectorAll('.showcase-carousel__slogan')).toHaveLength(
        3
      );
    });

    it('«Смотреть проект» с названием в имени ведёт к карточке на /projects', () => {
      renderCarousel();

      bestProjects.forEach((project, index) => {
        const slide = screen.getAllByRole('group')[index];
        const title = within(slide).getByRole('heading', { level: 3 });
        const link = within(slide).getByRole('link');

        expect(link).toHaveAccessibleName(
          `Смотреть проект ${title.textContent}`
        );
        expect(link).toHaveAttribute('href', `/projects#project-${project.id}`);
      });
    });

    it('счётчик скрыт от скринридера', () => {
      renderCarousel();

      expect(getCounter()).toHaveAttribute('aria-hidden', 'true');
    });

    it('точки — кнопки с подписью «Перейти к проекту …»', () => {
      renderCarousel();

      const dots = getDots();
      expect(dots).toHaveLength(4);
      expect(dots[0]).toHaveAccessibleName('Перейти к проекту «Вам Вода»');
      dots.forEach((dot) => expect(dot).toHaveAttribute('type', 'button'));
    });
  });

  describe('счётчик и точки', () => {
    it('стартует с первого слайда', () => {
      renderCarousel();

      expect(getCounter()).toHaveTextContent('01 / 04');
      expect(getDots().map((dot) => dot.getAttribute('aria-current'))).toEqual([
        'true',
        'false',
        'false',
        'false',
      ]);
    });

    it('после свайпа показывает слайд у начала ленты', () => {
      const { scrollTrackTo } = renderCarousel();

      scrollTrackTo(568);

      expect(getCounter()).toHaveTextContent('03 / 04');
      expect(getDots()[2]).toHaveAttribute('aria-current', 'true');
      expect(getDots()[2]).toHaveClass('showcase-carousel__dot--active');
      expect(getDots()[0]).toHaveAttribute('aria-current', 'false');
    });

    it('на середине свайпа выбирает ближайший слайд', () => {
      const { scrollTrackTo } = renderCarousel();

      scrollTrackTo(130);
      expect(getCounter()).toHaveTextContent('01 / 04');

      scrollTrackTo(160);
      expect(getCounter()).toHaveTextContent('02 / 04');
    });

    it('на 1024 px соседний слайд, видимый на 91%, не перехватывает счётчик', () => {
      const { scrollTrackTo } = renderCarousel(TABLET_1024);

      scrollTrackTo(1064);

      expect(getCounter()).toHaveTextContent('03 / 04');
    });

    it('в конце ленты активен последний слайд, хотя к началу он не встаёт', () => {
      const { scrollTrackTo } = renderCarousel(TABLET_1024);

      scrollTrackTo(1124);

      expect(getCounter()).toHaveTextContent('04 / 04');
      expect(getDots()[3]).toHaveAttribute('aria-current', 'true');
    });
  });

  describe('клик по точке', () => {
    it('плавно прокручивает трек к началу выбранного слайда', () => {
      const { track } = renderCarousel();

      fireEvent.click(getDots()[2]);

      expect(track.scrollTo).toHaveBeenCalledTimes(1);
      expect(track.scrollTo).toHaveBeenCalledWith({
        left: 568,
        behavior: 'smooth',
      });
    });

    it('при reduced motion прокручивает без анимации', () => {
      reducedMotion.current = true;
      const { track } = renderCarousel();

      fireEvent.click(getDots()[1]);

      expect(track.scrollTo).toHaveBeenCalledWith({
        left: 284,
        behavior: 'auto',
      });
    });

    it('после прокрутки к последнему слайду активна его точка', () => {
      const { track, scrollTrackTo } = renderCarousel(TABLET_1024);
      track.scrollTo.mockImplementation(({ left }) =>
        scrollTrackTo(Math.min(left, track.scrollWidth - track.clientWidth))
      );

      fireEvent.click(getDots()[3]);

      expect(getCounter()).toHaveTextContent('04 / 04');
      expect(getDots()[3]).toHaveAttribute('aria-current', 'true');
    });
  });

  describe('фокус в слайде', () => {
    /**
     * Ставит фокус на «Смотреть проект» слайда. jsdom понимает
     * `:focus-visible`, но всегда отвечает false — вердикт браузера
     * «фокус с клавиатуры» подменяется на самой ссылке.
     * @param {number} index - Индекс слайда.
     * @param {{ keyboard: boolean }} options - Откуда пришёл фокус.
     */
    const focusSlideLink = (index, { keyboard }) => {
      const link = within(screen.getAllByRole('group')[index]).getByRole(
        'link'
      );
      vi.spyOn(link, 'matches').mockImplementation(
        (selector) => keyboard && selector === ':focus-visible'
      );
      act(() => link.focus());
    };

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('с клавиатуры прокручивает трек к слайду в фокусе', () => {
      const { track } = renderCarousel();

      focusSlideLink(2, { keyboard: true });

      expect(track.scrollTo).toHaveBeenCalledTimes(1);
      expect(track.scrollTo).toHaveBeenCalledWith({
        left: 568,
        behavior: 'smooth',
      });
    });

    it('при Shift+Tab назад доводит до предыдущего слайда', () => {
      const { track, scrollTrackTo } = renderCarousel(TABLET_1024);
      scrollTrackTo(1124);

      focusSlideLink(2, { keyboard: true });

      expect(track.scrollTo).toHaveBeenCalledWith({
        left: 1064,
        behavior: 'smooth',
      });
    });

    it('от мыши и касания не прокручивает — клик не уходит из-под курсора', () => {
      const { track } = renderCarousel();

      focusSlideLink(1, { keyboard: false });

      expect(track.scrollTo).not.toHaveBeenCalled();
    });
  });
});
