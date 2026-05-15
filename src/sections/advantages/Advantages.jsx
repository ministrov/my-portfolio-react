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
 * Использует данные из файла items.js и поддерживает переводы через i18n.
 *
 * @component
 * @example
 * return (
 *   <Advantages />
 * )
 */
const Advantages = () => {
  const { t } = useTranslation();

  // Константы для переводов
  const SECTION_TITLE = t('heading.advantages.name');
  const SECTION_SLOGAN = t('heading.advantages.subheading');

  return (
    <section className="advantages">
      <div className="container">
        <Heading title={SECTION_TITLE} slogan={SECTION_SLOGAN} />

        <AdvantagesList>
          {advantages.map((item) => (
            <AdvantagesItem
              key={item.id}
              text={item.text}
              icon={item.icon}
              altText={item.alt}
            />
          ))}
        </AdvantagesList>
      </div>
    </section>
  );
};

export default memo(Advantages);
