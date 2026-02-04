import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import ButtonLink from '../../components/buttonLink/ButtonLink';
import './style.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="about">
      <div className="container">
        <div className="about__wrapper">
          <Heading
            title={t('heading.about.name')}
            className="about__title"
          ></Heading>

          <motion.div
            className="about__right"
            initial={{ opacity: 0, scale: 0.8, x: 30 }} // Симметричное смещение
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ margin: '-50px' }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.4, // Задержка для последовательного появления
            }}
          >
            <strong className={'about__greeting'}>{t('about.title')}</strong>

            <p className="about__description">{t('about.descriptionOne')}</p>
            <p className="about__description">{t('about.descriptionTwo')}</p>

            <div className="about__link-box">
              <ButtonLink
                className={'about__link'}
                path={'/about'}
                text={t('about.link')}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
