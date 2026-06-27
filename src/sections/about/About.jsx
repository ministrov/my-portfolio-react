import { memo, useMemo } from 'react';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import Heading from '../../components/heading/Heading';
import ButtonLink from '../../components/buttonLink/ButtonLink';
import SocialList from '../../components/socials/SocialList';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import AboutStory from '../../components/aboutStory/AboutStory';
import AuthorIdentity from '../../components/authorIdentity/AuthorIdentity';
import Tag from '../../components/tag/Tag';
import { ABOUT_TECH_TAGS, ABOUT_STATS } from '../../const';
import cvPdf from '../../assets/pdfs/my-cv.pdf';
import './style.css';

/** Кривая плавности, общая для всех анимаций секции */
const EASE = [0.25, 0.1, 0.25, 1];

/** Общие настройки viewport для анимаций по скроллу */
const VIEWPORT = { once: true, margin: '-50px' };

/** Анимация правой колонки: появление справа */
const ANIMATION_CONFIG = {
  initial: { opacity: 0, scale: 0.96, x: 30 },
  whileInView: { opacity: 1, scale: 1, x: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.8, ease: EASE, delay: 0.4 },
};

/** Варианты анимации для стаггерного списка статистики (контейнер) */
const STATS_CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.55 },
  },
};

/** Варианты анимации для стаггерного списка статистики (элемент) */
const STATS_ITEM = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
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

  // Используется дважды (как текст кнопки и внутри aria-label) — выносим в переменную
  const promoBtnText = t('promo.promoBtn');

  // Хлебные крошки с мемоизацией для оптимизации
  const BREADCRUMBS = useMemo(
    () => [
      { id: 1, name: t('breadcrumbs.home'), link: '/' },
      { id: 2, name: t('breadcrumbs.about') },
    ],
    [t]
  );

  return (
    <section className={`about ${border ? 'about__without' : ''}`}>
      <div className="container">
        <Breadcrumbs items={BREADCRUMBS} />
        <div className="about__wrapper">
          <LazyMotion features={domAnimation}>
            {/* Левая колонка: заголовок + идентификационная карточка */}
            <div className="about__left">
              <Heading
                variant="display"
                title={t('heading.about.name')}
                accent={t('heading.about.accent')}
              />
              {link && <AuthorIdentity />}
            </div>

            {/* Правая колонка: нарратив, статистика, стек, CTA */}
            <m.div className="about__right" {...ANIMATION_CONFIG}>
              <AboutStory />

              {/* Статистика — чипы с ключевыми фактами */}
              <m.ul
                className="about__stats"
                variants={STATS_CONTAINER}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
              >
                {ABOUT_STATS.map(({ number, labelKey }) => (
                  <m.li
                    key={labelKey}
                    className="about__stat"
                    variants={STATS_ITEM}
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
