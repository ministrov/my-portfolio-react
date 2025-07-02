import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import Heading from '../../components/heading/Heading';
import Skill from '../../components/skill/Skill';
import { skills } from './skills';
import './style.css';

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
          spaceBetween={16}
          slidesPerView={4}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <ul
            className="skills__list"
          >
            {skills.map((skill) => (
              <SwiperSlide key={skill.id}>
                <Skill skill={skill}/>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
      </div>
    </section>
  );
};

export default Skills;
