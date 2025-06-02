import { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Promo from '../sections/promo/Promo';
import About from '../sections/about/About';
import Modal from '../components/modal/Modal';
import Skills from '../sections/skills/Skills';
import Advertisement from '../sections/advertisement/Advertisement';
import Testimonials from '../sections/testimonials/Testimonials';
import Faq from '../sections/faq/Faq';
import Services from '../sections/services/Services';
import Statistics from '../sections/statistics/Statistics';

const Home = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }

  //   let timeout = setTimeout(() => {
  //     setIsOpen(true);
  //   }, 60000);

  //   return () => {
  //     document.body.style.overflow = 'auto';
  //     clearTimeout(timeout);
  //   };
  // }, [isOpen]);

  const [isOpen, setIsOpen] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);

  // Проверяем localStorage при загрузке
  useEffect(() => {
    const modalShown = localStorage.getItem('modalShown');
    if (modalShown) {
      setIsModalShown(true);
    }
  }, []);

  // Открытие модального окна с учетом поведения пользователя
  useEffect(() => {
    if (isModalShown) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleScroll = () => {
      // Открываем модалку при скролле до 50% страницы
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight * 0.5) {
        openModal();
        window.removeEventListener('scroll', handleScroll);
      }
    };

    const timeout = setTimeout(() => {
      // Открываем через 30 сек, если пользователь не проскроллил
      if (!isOpen) {
        openModal();
      }
    }, 30000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalShown, isOpen]);

  const openModal = () => {
    if (isModalShown || isOpen) return;

    setIsOpen(true);
    // document.body.style.overflow = 'hidden';

    // Закрытие через 15 секунд, если пользователь не взаимодействовал
    const autoCloseTimer = setTimeout(() => {
      if (isOpen) {
        closeModal();
      }
    }, 15000);

    return () => clearTimeout(autoCloseTimer);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsModalShown(true);
    document.body.style.overflow = 'auto';
    localStorage.setItem('modalShown', 'true');
  };

  return (
    <>
      <Helmet>
        <title>A Home page of Anton Zhilin professional portfolio</title>
        <meta
          name="description"
          content="A Home page of the frontend developer portfolio about developing a stunning apps and web applications"
          data-rh="true"
        />
        <meta
          name="keywords"
          content="HTML, web layout, outsourcing, development, web developer, Figma, PSD, frontend, order"
        />
        <link rel="canonical" href={`${window.location.origin}/`} />
      </Helmet>
      <section className="main-page">
        <h1 className="visually-hidden">Home page of the author portfolio</h1>

        <Promo />

        <Statistics />

        <About />

        <Skills />

        <Services />

        <Advertisement />

        <Testimonials />

        <Faq />

        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          autoCloseDelay={15000}
        />
      </section>
    </>
  );
};

export default Home;
