import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
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

        <div className="about__wrapper">
          <div className="about__left">
            <strong className={'about__greeting'}>{t('about.title')}</strong>

            <p className="about__description">{t('about.descriptionOne')}</p>
            <p className="about__description">{t('about.descriptionTwo')}</p>
          </div>

          <div
            className="about__right"
          >
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: { delay: 0.8, duration: 0.5, ease: 'easeInOut' },
              }}
              className="about__image"
              src={author}
              width={500}
              height={500}
              alt={"Focus on author's face"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
