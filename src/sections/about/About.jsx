import { LazyMotion, m, domAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { memo } from 'react';
import AuthorPhoto from '../../components/authorPhoto/AuthorPhoto';
import Heading from '../../components/heading/Heading';
import ButtonLink from '../../components/buttonLink/ButtonLink';
import SocialList from '../../components/socials/SocialList';
import cvPdf from '../../assets/pdfs/my-cv.pdf';
import './style.css';

/**
 * Компонент секции "Обо мне".
 * Отображает информацию об авторе, фото, описание, кнопки для скачивания CV и ссылки на соцсети.
 * Поддерживает анимации через Framer Motion и адаптивную отрисовку в зависимости от пропсов.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {boolean} [props.link=true] - Показывать ли ссылку на страницу "Обо мне"
 * @param {boolean} [props.button=true] - Показывать ли кнопку скачивания CV и соцсети
 * @example
 * <About link button />
 * <About link={false} button={true} />
 */

// Константы для анимации
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

const About = ({ link = true, button = true }) => {
  const { t } = useTranslation();

  // Константы для переводов
  const HEADING_TITLE = t('heading.about.name');
  const DESCRIPTION_ONE = t('about.descriptionOne');
  const DESCRIPTION_TWO = t('about.descriptionTwo');
  const PROMO_BTN_TEXT = t('promo.promoBtn');
  const LINK_TEXT = t('about.link');

  return (
    <section className="about">
      <div className="container">
        <div className="about__wrapper">
          <Heading title={HEADING_TITLE} className="about__title" />

          <LazyMotion features={domAnimation}>
            <m.div className="about__right" {...ANIMATION_CONFIG}>
              {link && <AuthorPhoto />}

              <p className="about__description">{DESCRIPTION_ONE}</p>
              <p className="about__description">{DESCRIPTION_TWO}</p>

              {button && (
                <div className="about__btns">
                  <a
                    className="promo__btn"
                    href={cvPdf}
                    download="my-cv.pdf"
                    rel="noopener noreferrer"
                    aria-label={`Скачать резюме (${PROMO_BTN_TEXT})`}
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
