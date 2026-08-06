import { LazyMotion, m, domAnimation } from 'motion/react';
import { useTranslation } from 'react-i18next';
import ServicesItem from '../../components/servicesItem/ServicesItem';
import Heading from '../../components/heading/Heading';
import ServicesList from './ServicesList';
import useRevealMotion from '../../hooks/useRevealMotion';
import { services } from '../../const';
import './style.css';

/**
 * Коэффициент задержки появления между карточками (в секундах).
 * Каскад читается как «список появился», а не как очередь: три карточки
 * укладываются в 0.16 с вместо прежних 0.6 с.
 */
const ANIMATION_DELAY_FACTOR = 0.08;

/**
 * Карточка услуги: появление по скроллу с общим пресетом секции.
 * Вынесена в отдельный компонент, потому что useRevealMotion — хук
 * и не может вызываться внутри map родителя.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {Object} props.service - Объект услуги (id, title, description, icon)
 * @param {number} props.index - Порядковый номер для расчёта задержки каскада
 * @example
 * <ServicesCard service={service} index={0} />
 */
const ServicesCard = ({ service, index }) => {
  const reveal = useRevealMotion({ delay: index * ANIMATION_DELAY_FACTOR });

  return (
    <m.li className="services__item" {...reveal}>
      <ServicesItem service={service} />
    </m.li>
  );
};

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
              <ServicesCard key={service.id} service={service} index={index} />
            ))}
          </LazyMotion>
        </ServicesList>
      </div>
    </section>
  );
};

export default Services;
