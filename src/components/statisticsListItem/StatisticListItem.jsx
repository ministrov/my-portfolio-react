import { useTranslation } from 'react-i18next';
import CountUp from 'react-countup';
import './style.css';

const StatisticListItem = ({ stats }) => {
  const { t } = useTranslation();
  return (
    <li className="statistics__item">
      <CountUp
        end={stats.num}
        duration={5}
        delay={2}
        className="statistics__count"
      />
      <p className={'statistics__desc'}>{t(stats.text)}</p>
    </li>
  );
};

export default StatisticListItem;
