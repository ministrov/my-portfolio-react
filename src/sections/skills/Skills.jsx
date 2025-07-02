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
          modules={[Autoplay, A11y]} // Модуль доступности
          speed={1650} // Скорость анимации
          autoplay={{ // Параметры автоматической прокрутки
            delay: 1000, // Задержка перед сменой слайда
            disableOnInteraction: false, // Продолжать автопрокрутку при взаимодействии
            pauseOnMouseEnter: true, // Остановить автопрокрутку при наведении мыши
          }}
          loop={true} // Включаем цикл воспроизведения
          spaceBetween={16} // Расстояние между элементами
          slidesPerView={'auto'} // Автоматически адаптируемое количество элементов
          centeredSlides={false} // Отключение центрирования активных слайдов
          breakpoints={{ // Адаптивные настройки
            320: { slidesPerView: 1 }, // На маленьких экранах — два элемента
            768: { slidesPerView: 2 }, // На планшетах — три элемента
            1024: { slidesPerView: 4 }, // На больших экранах — четыре элемента
            1224: { slidesPerView: 5 }, // На больших экранах — четыре элемента
          }}
          grabCursor={true} // Курсор захвата позволяет визуально показать, что слайдер доступен для перетаскивания
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
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
