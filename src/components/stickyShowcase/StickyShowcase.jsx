import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from 'motion/react';
import ShowcasingCard from '../showcasingCard/ShowcasingCard';
import { projects } from '../../sections/projects/projects';
import './style.css';

/** Доля сегмента (0…1), на которую соседние карточки перекрываются при кроссфейде. */
const OVERLAP = 0.15;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/**
 * Возвращает непрозрачность карточки-изображения для текущего непрерывного
 * индекса скролла. Первая карточка всегда полностью непрозрачна — ей не за
 * кем прятаться. Остальные проявляются поверх предыдущей на последних
 * `OVERLAP` долях её сегмента: предыдущая карточка при этом не гаснет, а
 * остаётся `opacity: 1` под входящей — так фон секции не проступает в момент
 * смены (в отличие от симметричного затухания обеих карточек одновременно).
 *
 * Годится только для сплошной картинки: она непрозрачна на каждом пикселе,
 * поэтому верхний слой полностью перекрывает нижний. Для заголовка так не
 * получится (см. {@link getTitleOpacity}).
 *
 * @param {number} continuousIndex - Непрерывный индекс прокрутки (0…N-1)
 * @param {number} cardIndex - Индекс карточки в массиве
 * @returns {number} Непрозрачность карточки (0…1)
 */
const getCardOpacity = (continuousIndex, cardIndex) => {
  if (cardIndex === 0) return 1;
  return clamp((continuousIndex - (cardIndex - OVERLAP)) / OVERLAP, 0, 1);
};

/**
 * Возвращает непрозрачность общего узла заголовка.
 *
 * В отличие от фото, буквы не сплошные — у них прозрачные промежутки между
 * штрихами. Если держать заголовки всех карточек наложенными друг на друга
 * (как фото в {@link getCardOpacity}), заголовок нижней карточки просвечивает
 * сквозь эти промежутки даже после того, как переход давно завершился —
 * получается нечитаемая накладка из двух текстов. Поэтому в разметке всего
 * один узел заголовка с текстом активного проекта; сам он на подходе к
 * границе между карточками ненадолго гаснет (симметрично, до 0) и к моменту,
 * когда текст меняется на следующий (в момент округления `continuousIndex`
 * до соседнего целого), уже почти не виден — смена текста происходит во время
 * провала непрозрачности, а не поверх видимого предыдущего заголовка.
 *
 * @param {number} continuousIndex - Непрерывный индекс прокрутки (0…N-1)
 * @param {number} activeIndex - Индекс карточки, чей заголовок сейчас показан
 * @returns {number} Непрозрачность заголовка (0…1)
 */
const getTitleOpacity = (continuousIndex, activeIndex) => {
  const distanceFromCenter = Math.abs(continuousIndex - activeIndex);
  const plateau = 0.5 - OVERLAP;
  if (distanceFromCenter <= plateau) return 1;
  return clamp(1 - (distanceFromCenter - plateau) / OVERLAP, 0, 1);
};

/**
 * Липкая витрина лучших проектов на главной странице.
 *
 * Высокая обёртка (N экранов) держит внутри себя `position: sticky`-вьюпорт
 * высотой в экран; по мере прокрутки родительской обёртки пользователем
 * непрерывный индекс (0…N-1), посчитанный из геометрии обёртки и вьюпорта,
 * управляет кроссфейдом карточек, активной точкой-индикатором и счётчиком.
 * Направление и скорость смены проекта задаёт сам пользователь — таймера нет,
 * поэтому кнопка паузы (обязательная для автопрокрутки по WCAG 2.2.2) здесь
 * не нужна по конструкции.
 *
 * Ссылка на карточку (`ShowcasingCard`) кликабельна и доступна по Tab только
 * у активной карточки — `visibility: hidden` у остальных не только убирает их
 * из-под клика (иначе верхняя по DOM-порядку невидимая карточка перехватывала
 * бы клик по видимой), но и сама по себе выводит их ссылки из порядка
 * табуляции, так что фокус не может увести на карточку вне текущего окна
 * прокрутки.
 *
 * При `prefers-reduced-motion: reduce` рендерится статичный фолбэк: те же
 * карточки друг под другом в обычном потоке документа, без `sticky` и без
 * слушателя скролла.
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
  const rafRef = useRef(null);
  const [continuousIndex, setContinuousIndex] = useState(0);

  const bestProjects = useMemo(
    () => projects.filter((item) => item.isBest),
    []
  );
  const count = bestProjects.length;

  const recalc = useCallback(() => {
    const wrapper = wrapperRef.current;
    const viewport = viewportRef.current;
    if (!wrapper || !viewport) return;

    const scrollableDistance = wrapper.offsetHeight - viewport.offsetHeight;
    if (scrollableDistance <= 0) {
      setContinuousIndex(0);
      return;
    }

    const scrolled = -wrapper.getBoundingClientRect().top;
    const progress = clamp(scrolled / scrollableDistance, 0, 1);
    setContinuousIndex(progress * (count - 1));
  }, [count]);

  useEffect(() => {
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

  const activeIndex = clamp(Math.round(continuousIndex), 0, count - 1);

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
        >
          <h2
            className="sticky-showcase__title"
            style={{ opacity: getTitleOpacity(continuousIndex, activeIndex) }}
          >
            {t(bestProjects[activeIndex].title)}
          </h2>

          <div className="sticky-showcase__cards">
            {bestProjects.map((project, index) => (
              <div
                key={project.id}
                className={
                  index === activeIndex
                    ? 'sticky-showcase__card sticky-showcase__card--active'
                    : 'sticky-showcase__card'
                }
                style={{ opacity: getCardOpacity(continuousIndex, index) }}
              >
                <ShowcasingCard
                  id={project.id}
                  image={project.imgCover}
                  tabletImg={project.imgCoverTablet}
                  mobileImg={project.imgCoverMobile}
                  name={project.title}
                  renderName={false}
                />
              </div>
            ))}
          </div>

          <div className="sticky-showcase__meta">
            <span className="sticky-showcase__counter" aria-hidden="true">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(count).padStart(2, '0')}
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
      </div>
    </div>
  );
};

export default StickyShowcase;
