import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
          <motion.div
            className="about__left"
            initial={{ opacity: 0, scale: 0.8, x: -30 }} // Уменьшил масштаб и добавил смещение по X
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ margin: '-50px' }} // Добавил настройки viewport
            transition={{
              duration: 0.8, // Увеличил длительность
              ease: [0.25, 0.1, 0.25, 1], // Более плавная easing-функция
              delay: 0.2, // Добавил небольшую задержку
            }}
          >
            <img
              className="about__image"
              src={author}
              width={500}
              height={500}
              alt={"Focus on author's face"}
              loading="lazy"
            />
          </motion.div>

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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

// import { motion } from 'framer-motion';
// import { useTranslation } from 'react-i18next';
// import author from '../../assets/png/photo.webp';
// import Heading from '../../components/heading/Heading';
// import './style.css';

// const About = () => {
//   const { t } = useTranslation();

//   return (
//     <section className="about">
//       <div className="container">
//         <Heading
//           title={t('heading.about.name')}
//           slogan={t('heading.about.subheading')}
//           className="about__title"
//         ></Heading>

//         <div className="about__wrapper">
//           <motion.div
//             className="about__left"
//             initial={{ opacity: 0, scale: 0.5 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, ease: 'easeInOut' }}
//           >
//             <img
//               className="about__image"
//               src={author}
//               width={500}
//               height={500}
//               alt={"Focus on author's face"}
//               loading="lazy"
//             />
//           </motion.div>
//           <motion.div
//             className="about__right"
//             initial={{ opacity: 0, scale: 0.5 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, ease: 'easeInOut' }}
//           >
//             <strong className={'about__greeting'}>{t('about.title')}</strong>

//             <p className="about__description">{t('about.descriptionOne')}</p>
//             <p className="about__description">{t('about.descriptionTwo')}</p>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;
