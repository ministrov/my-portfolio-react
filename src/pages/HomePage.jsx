import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Promo from '../sections/promo/Promo';
import About from '../sections/about/About';
import Skills from '../sections/skills/Skills.jsx';
import Showcasing from '../sections/showcasing/Showcasing.jsx';
import Faq from '../sections/faq/Faq';
import Services from '../sections/services/Services.jsx';
import Contact from '../sections/contact/Contact.jsx';
import Advantages from '../sections/advantages/Advantages.jsx';
import AnimatedBackground from '../components/animatedBackground/AnimatedBackground.jsx';

const Home = () => {
  const { t } = useTranslation();

  // console.log(<About />);

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
      <Promo />
      <About title link />
      <Services />
      <Skills />
      <Showcasing />
      <Advantages />
      <Faq />
      <Contact />
    </>
  );
};

export default Home;
