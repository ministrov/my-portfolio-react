import { memo } from 'react';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import Heading from '../../components/heading/Heading';
import ButtonLink from '../../components/buttonLink/ButtonLink';
import SocialList from '../../components/socials/SocialList';
import AboutStory from '../../components/aboutStory/AboutStory';
import cvPdf from '../../assets/pdfs/my-cv.pdf';
import aboutImage from '../../assets/png/about-image.webp';
import './style.css';

/**
 * Компонент секции "Обо мне".
 * Отображает фото автора, текстовое описание, опционально — кнопку скачивания CV,
 * соцсети и ссылку на полную страницу "Обо мне".
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
  initial: { opacity: 0, scale: 0.8, x: 30 },
  whileInView: { opacity: 1, scale: 1, x: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1],
    delay: 0.4,
  },
};

/** Анимация фото: появление слева */
const PHOTO_ANIMATION = {
  initial: { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: {
    duration: 0.7,
    ease: [0.25, 0.1, 0.25, 1],
    delay: 0.2,
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
            <div className="about__left">
              <Heading title={HEADING_TITLE} className="about__title" />

              <m.div className="about__photo" {...PHOTO_ANIMATION}>
                <picture>
                  <img
                    className="about__image"
                    src={aboutImage}
                    width="480"
                    height="540"
                    alt={t('about.photoAlt')}
                    loading="lazy"
                  />
                </picture>
              </m.div>
            </div>

            <m.div className="about__right" {...ANIMATION_CONFIG}>
              <AboutStory />

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
