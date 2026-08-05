import { LazyMotion, m, domAnimation } from 'motion/react';
import { useTranslation } from 'react-i18next';
import ServicesItem from '../../components/servicesItem/ServicesItem';
import Heading from '../../components/heading/Heading';
import ServicesList from './ServicesList';
import { services } from '../../const';
import './style.css';

/**
 * Коэффициент задержки анимации между элементами (в секундах)
 */
const ANIMATION_DELAY_FACTOR = 0.3;

/**
 * Компонент секции услуг
 * @returns {JSX.Element} Секция услуг
 */
const Services = () => {
  const { t } = useTranslation();

  // Если услуг нет, не рендерим список
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="services" aria-labelledby="services-heading">
      <div className="container">
        <Heading
          id="services-heading"
          title={t('heading.myServices.name')}
          accent={t('heading.myServices.accent')}
        />

        <ServicesList>
          <LazyMotion features={domAnimation}>
            {services.map((service, index) => (
              <m.li
                className="services__item"
                key={service.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * ANIMATION_DELAY_FACTOR,
                }}
              >
                <ServicesItem service={service} />
              </m.li>
            ))}
          </LazyMotion>
        </ServicesList>
      </div>
    </section>
  );
};

export default Services;
