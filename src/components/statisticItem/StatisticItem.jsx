import { useTranslation } from 'react-i18next';
import CountUp from 'react-countup';
import './style.css';

const StatisticItem = ({ stats }) => {
  const { num, text } = stats;
  const { t } = useTranslation();
  return (
    <li className="statistics__item">
      <CountUp
        end={num}
        duration={5}
        delay={2}
        className="statistics__count"
      />
      <p className={'statistics__desc'}>{t(text)}</p>
    </li>
  );
};

export default StatisticItem;
