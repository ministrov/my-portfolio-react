import { LazyMotion, m, domAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import AuthorPhoto from '../../components/authorPhoto/AuthorPhoto';
import Heading from '../../components/heading/Heading';
import ButtonLink from '../../components/buttonLink/ButtonLink';
import SocialList from '../../components/socials/SocialList';
import cvPdf from '../../assets/pdfs/my-cv.pdf';
import './style.css';

const About = ({ link, button, title }) => {
  const { t } = useTranslation();

  return (
    <section className="about">
      <div className="container">
        <div className="about__wrapper">
          <Heading title={t('heading.about.name')} className="about__title" />

          <LazyMotion features={domAnimation}>
            <m.div
              className="about__right"
              initial={{ opacity: 0, scale: 0.8, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.4,
              }}
            >
              {title && (
                <strong className="about__greeting">{t('about.title')}</strong>
              )}

              {link && <AuthorPhoto />}

              <p className="about__description">{t('about.descriptionOne')}</p>
              <p className="about__description">{t('about.descriptionTwo')}</p>

              {button && (
                <div className="about__btns">
                  <a
                    className="promo__btn"
                    href={cvPdf}
                    download={cvPdf}
                    rel="noopener noreferrer"
                  >
                    {t('promo.promoBtn')}
                    <span className="btn__icon">
                      <BsBoxArrowInUpRight width={20} height={20} />
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

export default About;
