import { useTranslation } from 'react-i18next';
import { LazyMotion, domAnimation } from 'framer-motion';
import { memo } from 'react';
import Heading from '../../components/heading/Heading';
import AdvantagesList from './AdvantagesList';
import AdvantagesItem from './AdvantagesItem';
import advantages from './items';
import './style.css';

/**
 * Компонент секции "Преимущества".
 * Отображает список преимуществ автора с иконками и описаниями.
 * Данные берутся из items.js, тексты резолвятся через i18n.
 *
 * @component
 * @example
 * return <Advantages />
 */
const Advantages = () => {
  const { t } = useTranslation();

  return (
    <section className="advantages">
      <div className="container">
        <Heading
          variant="display"
          title={t('heading.advantages.name')}
          accent={t('heading.advantages.accent')}
        />

        <AdvantagesList>
          <LazyMotion features={domAnimation}>
            {advantages.map(({ id, text, icon, alt }, index) => (
              <AdvantagesItem
                key={id}
                index={index}
                text={text}
                icon={icon}
                altText={t(alt)}
              />
            ))}
          </LazyMotion>
        </AdvantagesList>
      </div>
    </section>
  );
};

export default memo(Advantages);
