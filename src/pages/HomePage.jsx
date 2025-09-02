// import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Promo from '../sections/promo/Promo';
import About from '../sections/about/About';
// import Modal from '../components/modal/Modal';
import Skills from '../sections/skills/Skills.jsx';
import Showcasing from '../sections/showcasing/Showcasing.jsx';
import Faq from '../sections/faq/Faq';
import Services from '../sections/services/Services.jsx';

const Home = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [isModalShown, setIsModalShown] = useState(false);
  // const scrollTriggered = useRef(false);
  // const timeoutRef = useRef(null);
  // const autoCloseRef = useRef(null);
  const { t } = useTranslation();

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }

  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, [isOpen]);

  // useEffect(() => {
  //   if (isModalShown) return;

  //   timeoutRef.current = setTimeout(() => {
  //     if (!scrollTriggered.current && !isModalShown && !isOpen) {
  //       openModal();
  //     }
  //   }, 30000);

  //   return () => {
  //     clearTimeout(timeoutRef.current);
  //     clearTimeout(autoCloseRef.current);
  //   };

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isModalShown, isOpen]);

  // const openModal = () => {
  //   if (isModalShown || isOpen) return;

  //   setIsOpen(true);

  //   autoCloseRef.current = setTimeout(() => {
  //     closeModal();
  //   }, 15000);
  // };

  // const closeModal = () => {
  //   setIsOpen(false);
  //   setIsModalShown(true);
  //   clearTimeout(autoCloseRef.current);
  // };

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

      <h1 className="visually-hidden">Home page of the author portfolio</h1>
      <Promo />
      <About />
      <Services />
      <Skills />
      <Showcasing />
      <Faq />
      {/* <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        autoCloseDelay={15000}
      /> */}
    </>
  );
};

export default Home;
