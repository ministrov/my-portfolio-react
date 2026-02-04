import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import Heading from '../components/heading/Heading';
import AnimatedBackground from '../components/animatedBackground/AnimatedBackground';
import aboutImg from '../assets/png/about-image.webp';

const AboutPage = () => {
  const { t } = useTranslation();
  const BREADCRUMBS = [
    { id: 1, name: t('breadcrumbs.home'), link: '/' },
    { id: 2, name: t('breadcrumbs.about') },
  ];

  return (
    <>
      <Helmet>
        <title>{t('metadata.home.title')}</title>
        <meta
          name="description"
          content={t('metadata.home.description')}
          data-rh="true"
        />
        <meta name="keywords" content={t('metadata.home.keywords')} />
      </Helmet>

      <AnimatedBackground />

      <h1 className="visually-hidden">Страница об авторе</h1>

      <section className="about">
        <div className="container">
          <Breadcrumbs items={BREADCRUMBS} />
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
              <p className="about__description">{t('about.descriptionOne')}</p>
              <p className="about__description">{t('about.descriptionTwo')}</p>
            </motion.div>
          </div>

          <div style={{ marginTop: '120px' }}>
            <img
              src={aboutImg}
              width={1224}
              height={700}
              alt="Крупным планом автор проекта"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
