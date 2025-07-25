import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import ShowcasingCard from '../showcasingCard/ShowcasingCard';
import { projects } from '../../sections/projects/projects';

const Carousel = () => {
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
      {projects.map((project) => (
        <SwiperSlide key={project.id}>
          <ShowcasingCard
            image={project.img}
            name={project.title}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
