import { useState } from 'react';
import { LazyMotion, m, domAnimation } from 'framer-motion';
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
 * Компонент секции услуг с раскрывающимися карточками
 * @returns {JSX.Element} Секция услуг
 */
const Services = () => {
  const [openCards, setOpenCards] = useState({});
  const { t } = useTranslation();

  /**
   * Обработчик переключения состояния карточки
   * @param {number} id - Идентификатор услуги
   */
  const handleToggleExpand = (id) => {
    setOpenCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Если услуг нет, не рендерим список
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="services">
      <h2 className="visually-hidden">Section for a services</h2>
      <div className="container">
        <Heading
          title={t('heading.myServices.name')}
          slogan={t('heading.myServices.subheading')}
          className="services__title"
        />

        <ServicesList>
          <LazyMotion features={domAnimation}>
            {services.map((service, index) => (
              <m.li
                className={`services__item ${openCards[service.id] ? 'services__expanded' : ''}`}
                key={service.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * ANIMATION_DELAY_FACTOR,
                }}
              >
                <ServicesItem
                  service={service}
                  open={openCards[service.id]}
                  onClick={() => handleToggleExpand(service.id)}
                />
              </m.li>
            ))}
          </LazyMotion>
        </ServicesList>
      </div>
    </section>
  );
};

export default Services;
