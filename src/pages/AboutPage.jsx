import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import About from '../sections/about/About';
import AboutCapabilities from '../components/aboutCapabilities/AboutCapabilities';
import AboutExperience from '../components/aboutExperience/AboutExperience';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
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

      <div className="container">
        <Breadcrumbs items={BREADCRUMBS} />
      </div>

      <About button />

      <div
        className="container"
        style={{ marginTop: '120px', marginBottom: '40px' }}
      >
        <img
          src={aboutImg}
          width={1224}
          height={700}
          alt="Крупным планом автор проекта"
        />
      </div>

      <AboutCapabilities />

      <AboutExperience />
    </>
  );
};

export default AboutPage;
