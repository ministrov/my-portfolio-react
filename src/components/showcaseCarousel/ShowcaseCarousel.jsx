import { useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from 'motion/react';
import { MdArrowForward } from 'react-icons/md';
import ShowcasingCardPicture from '../showcasingCard/ShowcasingCardPicture';
import './style.css';

const pad = (value) => String(value).padStart(2, '0');

/**
 * Прокрутка трека, при которой слайд встаёт к началу ленты.
 * Отсчёт ведётся от первого слайда, а не от края трека: так формула не зависит
 * от `padding-inline` трека — при равном ему `scroll-padding-inline` точка
 * привязки первого слайда и есть нулевая прокрутка.
 * @param {HTMLElement} slide - Слайд, к которому нужно прокрутить.
 * @param {HTMLElement} firstSlide - Первый слайд ленты.
 * @returns {number} Значение `scrollLeft` трека в пикселях.
 */
const getSlideScrollLeft = (slide, firstSlide) =>
  slide.offsetLeft - firstSlide.offsetLeft;

/**
 * Индекс слайда, чья точка привязки ближе всего к текущей прокрутке трека.
 *
 * Считается по `scrollLeft`, а не через `IntersectionObserver` с порогом 0,6:
 * на 860–1024 px слайд `min(520px, 72%)` оставляет соседний видимым больше чем
 * на 60%, и «видимых» слайдов становится два. Точки привязки обрезаются по
 * максимальной прокрутке: последние слайды не могут встать к началу ленты, и в
 * конце трека браузер останавливается на его краю. При равном расстоянии
 * выигрывает более поздний слайд — если несколько последних слайдов упираются
 * в один край, в конце ленты счётчик показывает последний.
 * @param {HTMLElement} track - Прокручиваемый трек.
 * @param {HTMLElement[]} slides - Слайды в порядке ленты.
 * @returns {number} Индекс активного слайда (0, если прокручивать нечего).
 */
const getActiveSlideIndex = (track, slides) => {
  const maxScrollLeft = track.scrollWidth - track.clientWidth;
  const [firstSlide] = slides;
  if (maxScrollLeft <= 0 || !firstSlide) return 0;

  let activeIndex = 0;
  let minDistance = Infinity;

  slides.forEach((slide, index) => {
    const snapLeft = Math.min(
      getSlideScrollLeft(slide, firstSlide),
      maxScrollLeft
    );
    const distance = Math.abs(snapLeft - track.scrollLeft);
    if (distance <= minDistance) {
      minDistance = distance;
      activeIndex = index;
    }
  });

  return activeIndex;
};

/**
 * Свайп-лента лучших проектов — витрина для планшетов, телефонов и
 * тач-экранов (ветку выбирает {@link StickyShowcase}).
 *
 * Разметка — по паттерну карусели WAI-ARIA: `region` с локализованным
 * `aria-roledescription` → панель со счётчиком и точками → трек → слайды
 * `role="group"` с подписью «1 из 4: Вам Вода». Не `ul`/`li`: `role="group"`
 * на `li` ломает семантику списка. Точки стоят до трека, как в паттерне, —
 * Tab проходит сначала их, потом ссылки слайдов.
 *
 * Листает пользователь: нативный scroll-snap, без таймера и без JS-анимации.
 * Активный слайд выводится из `scrollLeft` трека (см. {@link getActiveSlideIndex})
 * на каждом событии `scroll` — браузер шлёт его не чаще раза за кадр, так что
 * отдельный троттлинг через `requestAnimationFrame` не нужен. Клик по точке
 * прокручивает трек к точке привязки по той же формуле, поэтому активная
 * точка после клика совпадает с выбранной по построению. Tab по ссылкам
 * браузер сам доводит до слайда в фокусе — счётчик идёт за ним так же.
 *
 * Ссылка «Смотреть проект» — только кнопка внутри слайда, а не вся карточка:
 * при свайпе по растянутой ссылке бывают случайные переходы. Доступное имя —
 * видимый текст плюс название проекта через `aria-labelledby` («Смотреть
 * проект Вам Вода»): `aria-label` с другой формулировкой разошёлся бы с видимой
 * подписью (WCAG 2.5.3), а четыре одинаковых «Смотреть проект» в списке
 * ссылок скринридера неотличимы.
 *
 * Визуальная часть ленты — в style.css (S01-T05).
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Array<{
 *   id: number,
 *   title: string,
 *   slogan: string,
 *   year: string,
 *   role: string,
 *   imgCover: string,
 *   imgCoverTablet: string,
 *   imgCoverMobile: string
 * }>} props.projects - Проекты витрины; `title` и `slogan` — ключи перевода.
 * @returns {JSX.Element} Карусель проектов.
 *
 * @example
 * const bestProjects = projects.filter((item) => item.isBest);
 * return <ShowcaseCarousel projects={bestProjects} />;
 */
const ShowcaseCarousel = ({ projects }) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const baseId = useId();
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const count = projects.length;

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActiveIndex(getActiveSlideIndex(track, slideRefs.current));
  };

  const handleDotClick = (index) => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    const firstSlide = slideRefs.current[0];
    if (!track || !slide || !firstSlide) return;

    track.scrollTo({
      left: getSlideScrollLeft(slide, firstSlide),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div
      className="showcase-carousel"
      role="region"
      aria-roledescription={t('showcasing.carouselRole')}
      aria-label={t('showcasing.carouselLabel')}
    >
      <div className="showcase-carousel__controls">
        <span className="showcase-carousel__counter" aria-hidden="true">
          {pad(activeIndex + 1)} / {pad(count)}
        </span>

        <div className="showcase-carousel__dots">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={
                index === activeIndex
                  ? 'showcase-carousel__dot showcase-carousel__dot--active'
                  : 'showcase-carousel__dot'
              }
              aria-current={index === activeIndex}
              aria-label={t('showcasing.dotAriaLabel', {
                project: t(project.title),
              })}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>

      <div
        className="showcase-carousel__track"
        ref={trackRef}
        onScroll={handleScroll}
      >
        {projects.map((project, index) => {
          const titleId = `${baseId}-title-${project.id}`;
          const linkTextId = `${baseId}-link-${project.id}`;
          const slogan = t(project.slogan);

          return (
            <div
              key={project.id}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              className="showcase-carousel__slide"
              role="group"
              aria-roledescription={t('showcasing.slideRole')}
              aria-label={t('showcasing.slideLabel', {
                current: index + 1,
                total: count,
                project: t(project.title),
              })}
            >
              <ShowcasingCardPicture
                image={project.imgCover}
                tabletImg={project.imgCoverTablet}
                mobileImg={project.imgCoverMobile}
                name={project.title}
              />

              <p className="showcase-carousel__meta">
                <span>{project.year}</span>
                <span className="showcase-carousel__meta-role">
                  {project.role}
                </span>
              </p>

              <h3 id={titleId} className="showcase-carousel__title">
                {t(project.title)}
              </h3>

              {slogan && <p className="showcase-carousel__slogan">{slogan}</p>}

              <Link
                to={`/projects#project-${project.id}`}
                className="showcase-carousel__link"
                aria-labelledby={`${linkTextId} ${titleId}`}
              >
                <span id={linkTextId} className="showcase-carousel__link-text">
                  {t('showcasing.viewProject')}
                </span>
                <MdArrowForward
                  className="showcase-carousel__link-icon"
                  size={18}
                  aria-hidden="true"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowcaseCarousel;
