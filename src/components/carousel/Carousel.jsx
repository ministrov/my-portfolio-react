import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import ShowcasingCard from '../showcasingCard/ShowcasingCard';
import { projects } from '../../sections/projects/projects';

const Carousel = () => {
  const bestProjects = projects.filter((item) => item.isBest);

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      speed={1000}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop={true}
    >
      {bestProjects.map((project) => (
        <SwiperSlide key={project.id}>
          <ShowcasingCard
            image={project.img}
            tabletImg={project.imgTablet}
            mobileImg={project.imgMobile}
            name={project.title}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
