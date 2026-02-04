import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import AnimatedBackground from '../components/animatedBackground/AnimatedBackground';

const AboutPage = () => {
  const { t } = useTranslation();

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

      <h1 className="visually-hidden">Главная страница</h1>

      <div style={{ height: '100vh' }}>
        <div className="container">
          <h2>About</h2>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
