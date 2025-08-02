import { useTranslation } from 'react-i18next';
import FadeIn from '../../components/fadeIn/FadeIn';
import author from '../../assets/png/photo.webp';
import Heading from '../../components/heading/Heading';
import './style.css';

const About = () => {
  const { t } = useTranslation();
  return (
    <section className="about">
      <div className="container">
        <Heading
          title={t('heading.about.name')}
          slogan={t('heading.about.subheading')}
          className="about__title"
        ></Heading>

        <FadeIn>
          <div className="about__wrapper">
            <div
              className="about__left"
            >
              <img
                className="about__image"
                src={author}
                width={500}
                height={500}
                alt={"Focus on author's face"}
                loading="lazy"
              />
            </div>
            <div className="about__right">
              <strong className={'about__greeting'}>{t('about.title')}</strong>

              <p className="about__description">{t('about.descriptionOne')}</p>
              <p className="about__description">{t('about.descriptionTwo')}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default About;
