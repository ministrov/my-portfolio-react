import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from 'motion/react';
import { MdArrowForward } from 'react-icons/md';
import ShowcasingCard from '../showcasingCard/ShowcasingCard';
import ShowcasingCardPicture from '../showcasingCard/ShowcasingCardPicture';
import { projects } from '../../sections/projects/projects';
import './style.css';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const pad = (value) => String(value).padStart(2, '0');

/**
 * Класс на `<body>`, пока секция закреплена (`position: sticky` реально
 * прижата к верху вьюпорта). Секция рендерится на весь экран без отступа под
 * фикс-хедер (см. JSDoc StickyShowcase), поэтому хедер в это время визуально
 * перекрыт содержимым секции — сам по себе класс скрывает его через
 * `visibility: hidden` (см. style.css), а не оставляет просто перекрытым по
 * z-index: иначе его ссылки остались бы фокусируемыми по Tab, будучи
 * невидимыми — та же ловушка, которую фиксили для неактивных карточек.
 */
const HEADER_HIDDEN_CLASS = 'sticky-showcase-pinned';

/**
 * Липкая витрина лучших проектов на главной странице.
 *
 * Высокая обёртка (N экранов) держит внутри себя `position: sticky`-вьюпорт
 * высотой в экран; по мере прокрутки родительской обёртки пользователем
 * непрерывный индекс (0…N-1), посчитанный из геометрии обёртки и вьюпорта,
 * управляет кроссфейдом карточек-изображений, общим инфоблоком (эйброу,
 * заголовок, слоган, год/роль, кнопка-подсказка), активной точкой-индикатором
 * и счётчиком. Направление и скорость смены проекта задаёт сам пользователь —
 * таймера нет, поэтому кнопка паузы (обязательная для автопрокрутки по
 * WCAG 2.2.2) здесь не нужна по конструкции. Сам кроссфейд считает CSS через
 * `--continuous-index`/`--active-index` (см. style.css), а не React state —
 * подробности и обоснование асимметрии между фото и текстом там же.
 *
 * Ссылка на активный проект — один общий узел поверх инфоблока и картинок
 * (см. комментарий к opacity у `.sticky-showcase__info` в style.css про то,
 * почему не по одной на карточку), так что всегда есть ровно одна цель для
 * клика и Tab, синхронная с тем, что видно на экране.
 *
 * При `prefers-reduced-motion: reduce` рендерится статичный фолбэк: те же
 * карточки (уже с собственным заголовком, подсказкой и ссылкой через
 * {@link ShowcasingCard}) друг под другом в обычном потоке документа, без
 * `sticky` и без слушателя скролла.
 *
 * @component
 * @example
 * return <StickyShowcase />
 * @returns {JSX.Element} Секция витрины
 */
const StickyShowcase = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef(null);
  const viewportRef = useRef(null);
  const stageRef = useRef(null);
  const rafRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  const bestProjects = useMemo(
    () => projects.filter((item) => item.isBest),
    []
  );
  const count = bestProjects.length;

  /**
   * Пишет непрерывный индекс прокрутки прямо в CSS-переменную на `stage`
   * (минуя React state), откуда его читают формулы `opacity` в style.css —
   * see `--continuous-index` там же. В отличие от `activeIndex` (меняется
   * лишь раз на сегмент и обязан быть React state, раз от него зависит
   * рендер текста/ссылки), continuous-значение обновляется на каждом кадре
   * скролла; проведение его через setState гоняло бы полный ре-рендер и
   * реконсиляцию карточек+инфоблока по 60 раз в секунду.
   */
  const setContinuousIndexVar = useCallback((value) => {
    stageRef.current?.style.setProperty('--continuous-index', value);
  }, []);

  const recalc = useCallback(() => {
    const wrapper = wrapperRef.current;
    const viewport = viewportRef.current;
    if (!wrapper || !viewport) return;

    const scrollableDistance = wrapper.offsetHeight - viewport.offsetHeight;
    if (scrollableDistance <= 0) {
      setContinuousIndexVar(0);
      setActiveIndex(0);
      setIsPinned(false);
      return;
    }

    const scrolled = -wrapper.getBoundingClientRect().top;
    setIsPinned(scrolled >= 0 && scrolled <= scrollableDistance);

    const progress = clamp(scrolled / scrollableDistance, 0, 1);
    const continuousIndex = progress * (count - 1);
    setContinuousIndexVar(continuousIndex);

    const nextActiveIndex = clamp(Math.round(continuousIndex), 0, count - 1);
    setActiveIndex((prev) =>
      prev === nextActiveIndex ? prev : nextActiveIndex
    );
  }, [count, setContinuousIndexVar]);

  /**
   * Синхронизирует класс, скрывающий хедер, с состоянием `isPinned` —
   * отдельно от измерения скролла в {@link recalc}, чтобы добавление и
   * удаление класса были симметричны по построению (одна и та же функция
   * эффекта, а не разнесённые по разным колбэкам add/remove).
   */
  useEffect(() => {
    document.body.classList.toggle(HEADER_HIDDEN_CLASS, isPinned);
    return () => {
      document.body.classList.remove(HEADER_HIDDEN_CLASS);
    };
  }, [isPinned]);

  useLayoutEffect(() => {
    if (prefersReducedMotion || count < 2) return undefined;

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        recalc();
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      // StrictMode запускает эффект дважды подряд (mount → cleanup → mount);
      // без сброса в null отменённый здесь id остаётся «висеть» в rafRef, и
      // handleScroll после повторного mount навсегда молча выходит по своей
      // же проверке `rafRef.current !== null`, ни разу не планируя новый кадр.
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [prefersReducedMotion, count, recalc]);

  const scrollToSegment = useCallback(
    (index) => {
      const wrapper = wrapperRef.current;
      const viewport = viewportRef.current;
      if (!wrapper || !viewport || count < 2) return;

      const scrollableDistance = wrapper.offsetHeight - viewport.offsetHeight;
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      const target = wrapperTop + (index / (count - 1)) * scrollableDistance;

      window.scrollTo({
        top: target,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    [count, prefersReducedMotion]
  );

  if (count === 0) {
    return (
      <div className="sticky-showcase__empty" role="status" aria-live="polite">
        {t('showcasing.emptyMessage')}
      </div>
    );
  }

  if (prefersReducedMotion) {
    return (
      <div className="sticky-showcase sticky-showcase--static">
        <div className="container sticky-showcase__stage--static">
          {bestProjects.map((project) => (
            <div className="sticky-showcase__card--static" key={project.id}>
              <ShowcasingCard
                id={project.id}
                image={project.imgCover}
                tabletImg={project.imgCoverTablet}
                mobileImg={project.imgCoverMobile}
                name={project.title}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const activeProject = bestProjects[activeIndex];

  return (
    <div
      className="sticky-showcase"
      ref={wrapperRef}
      style={{ height: `${count * 100}vh` }}
    >
      <div className="sticky-showcase__viewport" ref={viewportRef}>
        <div
          className="container sticky-showcase__stage"
          role="region"
          aria-label={t('showcasing.regionAriaLabel')}
          ref={stageRef}
          style={{ '--active-index': activeIndex }}
        >
          <div className="sticky-showcase__info">
            <span className="sticky-showcase__eyebrow">
              {t('showcasing.eyebrow', {
                current: pad(activeIndex + 1),
                total: pad(count),
              })}
            </span>
            <h2 className="sticky-showcase__title">{t(activeProject.title)}</h2>
            <p className="sticky-showcase__subtitle">
              {t(activeProject.slogan)}
            </p>
          </div>

          <div className="sticky-showcase__cards">
            {bestProjects.map((project, index) => (
              <div
                key={project.id}
                className={
                  index === activeIndex
                    ? 'sticky-showcase__card sticky-showcase__card--active'
                    : 'sticky-showcase__card'
                }
                style={{ '--card-index': index }}
              >
                <ShowcasingCardPicture
                  image={project.imgCover}
                  tabletImg={project.imgCoverTablet}
                  mobileImg={project.imgCoverMobile}
                  name={project.title}
                />
              </div>
            ))}
          </div>

          <div className="sticky-showcase__footer">
            <div className="sticky-showcase__meta">
              <span>{activeProject.year}</span>
              <span className="sticky-showcase__meta-role">
                {activeProject.role}
              </span>
            </div>

            <span className="sticky-showcase__cta" aria-hidden="true">
              {t('showcasing.viewProject')}
              <MdArrowForward className="sticky-showcase__cta-icon" size={18} />
            </span>
          </div>

          <Link
            to={`/projects#project-${activeProject.id}`}
            className="sticky-showcase__link"
            aria-label={t('showcasing.ariaLabel', {
              project: t(activeProject.title),
            })}
          />
        </div>

        <span className="sticky-showcase__counter" aria-hidden="true">
          {pad(activeIndex + 1)} / {pad(count)}
        </span>

        <div className="sticky-showcase__dots">
          {bestProjects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={
                index === activeIndex
                  ? 'sticky-showcase__dot sticky-showcase__dot--active'
                  : 'sticky-showcase__dot'
              }
              aria-current={index === activeIndex}
              aria-label={t('showcasing.dotAriaLabel', {
                project: t(project.title),
              })}
              onClick={() => scrollToSegment(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyShowcase;
