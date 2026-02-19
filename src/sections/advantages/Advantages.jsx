import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import AdvantagesList from './AdvantagesList';
import AdvantagesItem from './AdvantagesItem';
import itemList from './items';
import './style.css';

const Advantages = () => {
  const { t } = useTranslation();
  return (
    <section className="advantages">
      <div className="container">
        <Heading
          title={t('heading.advantages.name')}
          slogan={t('heading.advantages.subheading')}
        />

        <AdvantagesList>
          {itemList.map((item) => (
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

export default Advantages;
