import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Promo from '../sections/promo/Promo';
import About from '../sections/about/About';
import Skills from '../sections/skills/Skills.jsx';
import Showcasing from '../sections/showcasing/Showcasing.jsx';
import Faq from '../sections/faq/Faq';
import Services from '../sections/services/Services.jsx';
import AnimatedBackground from '../components/animatedBackground/AnimatedBackground.jsx';

const Home = () => {
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

      <h1 className="visually-hidden">Home page of the author portfolio</h1>
      <Promo />
      <About />
      <Services />
      <Skills />
      <Showcasing />
      <Faq />
    </>
  );
};

export default Home;
