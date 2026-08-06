import { useTranslation } from 'react-i18next';
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
    <section className="advantages" aria-labelledby="advantages-heading">
      <div className="container">
        <Heading
          id="advantages-heading"
          title={t('heading.advantages.name')}
          accent={t('heading.advantages.accent')}
        />

        <AdvantagesList>
          {advantages.map(({ id, text, icon }) => (
            <AdvantagesItem key={id} text={text} icon={icon} />
          ))}
        </AdvantagesList>
      </div>
    </section>
  );
};

export default memo(Advantages);
