import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import About from '../sections/about/About';
import AboutCapabilities from '../components/aboutCapabilities/AboutCapabilities';
import AboutExperience from '../components/aboutExperience/AboutExperience';
import AboutEducation from '../components/aboutEducation/AboutEducation';
import AuthorPhoto from '../components/authorPhoto/AuthorPhoto';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import Contact from '../sections/contact/Contact';
import AnimatedBackground from '../components/animatedBackground/AnimatedBackground';

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

      <div className="container wrapper">
        <AuthorPhoto />
      </div>

      <AboutCapabilities />

      <AboutExperience />

      <AboutEducation />

      <Contact />
    </>
  );
};

export default AboutPage;
