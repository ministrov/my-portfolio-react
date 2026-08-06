import { memo } from 'react';
import { LazyMotion, m, domAnimation, useReducedMotion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import Heading from '../../components/heading/Heading';
import ButtonLink from '../../components/buttonLink/ButtonLink';
import SocialList from '../../components/socials/SocialList';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import AboutStory from '../../components/aboutStory/AboutStory';
import AuthorIdentity from '../../components/authorIdentity/AuthorIdentity';
import Tag from '../../components/tag/Tag';
import useRevealMotion, {
  REVEAL_EASE,
  REVEAL_VIEWPORT,
} from '../../hooks/useRevealMotion';
import { ABOUT_TECH_TAGS, ABOUT_STATS } from '../../const';
import cvPdf from '../../assets/pdfs/my-cv.pdf';
import './style.css';

/** Стартовое состояние правой колонки: короткий заход справа */
const RIGHT_COLUMN_FROM = { opacity: 0, scale: 0.96, x: 30 };

/**
 * Варианты анимации для стаггерного списка статистики (контейнер).
 * Цифры «4+ года / 10+ проектов / Middle / B2» — главное доказательство
 * квалификации на странице, поэтому цепочка задержек до них сведена к
 * минимуму: прежние delay 0.4 + delayChildren 0.55 откладывали их почти
 * на секунду после появления самой секции.
 */
const STATS_CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

/** Варианты анимации для стаггерного списка статистики (элемент) */
const STATS_ITEM = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: REVEAL_EASE },
  },
};

/** Облегчённый вариант элемента статистики для prefers-reduced-motion */
const STATS_ITEM_REDUCED = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'linear' } },
};

/**
 * Компонент секции "Обо мне".
 * Отображает идентификационную карточку (фото, имя, роль, доступность, соцсети),
 * нарративный текст (AboutStory), статистику и технологический стек.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {boolean} [props.link=false] - Показывать ли карточку автора и ссылку на страницу "Обо мне"
 * @param {boolean} [props.button=false] - Показывать ли кнопку скачивания CV и соцсети
 * @example
 * <About link />
 * <About button />
 */
const About = ({ link = false, button = false, border = false }) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const rightColumnMotion = useRevealMotion({
    from: RIGHT_COLUMN_FROM,
    duration: 0.6,
    delay: 0.15,
  });
  const statsItem = prefersReducedMotion ? STATS_ITEM_REDUCED : STATS_ITEM;

  // Используется дважды (как текст кнопки и внутри aria-label) — выносим в переменную
  const promoBtnText = t('promo.promoBtn');

  return (
    <section
      className={`about ${border ? 'about__without' : ''}`}
      aria-labelledby="about-heading"
    >
      <div className="container">
        {border && (
          <Breadcrumbs
            items={[
              { id: 1, name: t('breadcrumbs.home'), link: '/' },
              { id: 2, name: t('breadcrumbs.about') },
            ]}
          />
        )}
        <div className="about__wrapper">
          <LazyMotion features={domAnimation}>
            {/* Левая колонка: заголовок + идентификационная карточка */}
            <div className="about__left">
              <Heading
                id="about-heading"
                title={t('heading.about.name')}
                accent={t('heading.about.accent')}
              />
              {link && <AuthorIdentity />}
            </div>

            {/* Правая колонка: нарратив, статистика, стек, CTA */}
            <m.div className="about__right" {...rightColumnMotion}>
              <AboutStory />

              {/* Статистика — чипы с ключевыми фактами */}
              <m.ul
                className="about__stats"
                variants={STATS_CONTAINER}
                initial="hidden"
                whileInView="visible"
                viewport={REVEAL_VIEWPORT}
              >
                {ABOUT_STATS.map(({ number, labelKey }) => (
                  <m.li
                    key={labelKey}
                    className="about__stat"
                    variants={statsItem}
                  >
                    <span className="about__stat-number">{number}</span>
                    <span className="about__stat-label">{t(labelKey)}</span>
                  </m.li>
                ))}
              </m.ul>

              {/* Технологический стек — теги */}
              <ul className="about__tech" aria-label={t('about.techAriaLabel')}>
                {ABOUT_TECH_TAGS.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </ul>

              {button && (
                <div className="about__btns">
                  <a
                    className="promo__btn"
                    href={cvPdf}
                    download="my-cv.pdf"
                    rel="noopener noreferrer"
                    aria-label={t('about.cvAriaLabel', { text: promoBtnText })}
                  >
                    {promoBtnText}
                    <span className="btn__icon">
                      <BsBoxArrowInUpRight />
                    </span>
                  </a>

                  <SocialList variant="blue" />
                </div>
              )}

              {link && (
                <div className="about__link-box">
                  <ButtonLink
                    className="about__link"
                    path="/about"
                    text={t('about.link')}
                  />
                </div>
              )}
            </m.div>
          </LazyMotion>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
