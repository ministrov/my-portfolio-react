import { memo } from 'react';
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
          <div className="about__right">
            <AboutStory />

            {/* Статистика — чипы с ключевыми фактами */}
            <ul className="about__stats">
              {ABOUT_STATS.map(({ number, labelKey }) => (
                <li key={labelKey} className="about__stat">
                  <span className="about__stat-number">{number}</span>
                  <span className="about__stat-label">{t(labelKey)}</span>
                </li>
              ))}
            </ul>

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
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
