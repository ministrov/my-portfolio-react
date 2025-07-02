import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import Heading from '../../components/heading/Heading';
import Skill from '../../components/skill/Skill';
import { skills } from './skills';
import './style.css';

import 'swiper/css'; // Подключаем базовые стили swiper
import 'swiper/css/a11y'; // Стили модуля a11y

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section className="skills">
      <div className="container">
        <Heading
          title={t('heading.mySkills.name')}
          slogan={t('heading.mySkills.subheading')}
          className="skills__title"
        ></Heading>

        <Swiper
          modules={[Autoplay, A11y]}
          speed={650} // Скорость анимации
          autoplay={{
            delay: 800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          spaceBetween={16}
          slidesPerView={'auto'}
          centeredSlides={false}
          breakpoints={{
            454: { slidesPerView: 1 },
            455: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1224: { slidesPerView: 5 },
          }}
          grabCursor={true}

        >
          {skills.map((skill) => (
            <SwiperSlide key={skill.id}>
              <Skill skill={skill} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Skills;
