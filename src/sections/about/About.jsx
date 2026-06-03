import { memo } from 'react';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BsBoxArrowInUpRight, BsGeoAlt } from 'react-icons/bs';
import Heading from '../../components/heading/Heading';
import ButtonLink from '../../components/buttonLink/ButtonLink';
import SocialList from '../../components/socials/SocialList';
import AboutStory from '../../components/aboutStory/AboutStory';
import Tag from '../../components/tag/Tag';
import { ABOUT_TECH_TAGS, ABOUT_STATS } from '../../const';
import cvPdf from '../../assets/pdfs/my-cv.pdf';
import aboutImage from '../../assets/png/about-image.webp';
import './style.css';

/**
 * Компонент секции "Обо мне".
 * Отображает идентификационную карточку (фото, имя, роль, доступность, соцсети),
 * нарративный текст (AboutStory), статистику и технологический стек.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {boolean} [props.link=false] - Показывать ли ссылку на страницу "Обо мне"
 * @param {boolean} [props.button=false] - Показывать ли кнопку скачивания CV и соцсети
 * @example
 * <About link />
 * <About button />
 */

/** Анимация правой колонки: появление справа */
const ANIMATION_CONFIG = {
  initial: { opacity: 0, scale: 0.96, x: 30 },
  whileInView: { opacity: 1, scale: 1, x: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1],
    delay: 0.4,
  },
};

/** Анимация идентификационной карточки: появление слева */
const IDENTITY_ANIMATION = {
  initial: { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: {
    duration: 0.7,
    ease: [0.25, 0.1, 0.25, 1],
    delay: 0.2,
  },
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
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const About = ({ link = false, button = false }) => {
  const { t } = useTranslation();

  const HEADING_TITLE = t('heading.about.name');
  const PROMO_BTN_TEXT = t('promo.promoBtn');
  const LINK_TEXT = t('about.link');

  return (
    <section className="about">
      <div className="container">
        <div className="about__wrapper">
          <LazyMotion features={domAnimation}>

            {/* Левая колонка: заголовок + идентификационная карточка */}
            <div className="about__left">
              <Heading title={HEADING_TITLE} className="about__title" />

              <m.div className="about__identity" {...IDENTITY_ANIMATION}>
                {/* Фото */}
                <div className="about__id-photo">
                  <img
                    className="about__image"
                    src={aboutImage}
                    width="480"
                    height="540"
                    alt={t('about.photoAlt')}
                    loading="lazy"
                  />
                </div>

                {/* Метаданные автора */}
                <div className="about__id-meta">
                  <p className="about__id-name">{t('authorPhoto.name')}</p>
                  <p className="about__id-role">{t('authorPhoto.role')}</p>
                  <p className="about__id-location">
                    <BsGeoAlt className="about__id-location-icon" aria-hidden="true" />
                    {t('authorPhoto.location')}
                  </p>

                  <div className="about__available">
                    <span className="about__available-dot" aria-hidden="true" />
                    {t('about.available')}
                  </div>

                  <SocialList variant="blue" />
                </div>
              </m.div>
            </div>

            {/* Правая колонка: нарратив, статистика, стек, CTA */}
            <m.div className="about__right" {...ANIMATION_CONFIG}>
              <AboutStory />

              {/* Статистика — 4 чипа с ключевыми фактами */}
              <m.ul
                className="about__stats"
                variants={STATS_CONTAINER}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                {ABOUT_STATS.map(({ number, labelKey }) => (
                  <m.li key={labelKey} className="about__stat" variants={STATS_ITEM}>
                    <span className="about__stat-number">{number}</span>
                    <span className="about__stat-label">{t(labelKey)}</span>
                  </m.li>
                ))}
              </m.ul>

              {/* Технологический стек — теги */}
              <ul className="about__tech" aria-label={t('about.techAriaLabel')}>
                {ABOUT_TECH_TAGS.map(tag => (
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
                    aria-label={t('about.cvAriaLabel', { text: PROMO_BTN_TEXT })}
                  >
                    {PROMO_BTN_TEXT}
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
                    text={LINK_TEXT}
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
