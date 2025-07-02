import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import Heading from '../../components/heading/Heading';
// import SkillComponet from '../../components/skillComponent/SkillComponent';
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
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <ul
            className="skills__list"
          >
            {skills.map((skill) => (
              <li
                key={skill.id}
                className="skill__card"
                aria-label={skill.tech}
              >
                <SwiperSlide key={skill.id}>
                  {/* <SkillComponet
                    skill={skill}
                  /> */}
                </SwiperSlide>
              </li>
            ))}
          </ul>
        </Swiper>
      </div>
    </section>
  );
};

export default Skills;
