import { useTranslation } from 'react-i18next';
import StatisticListItem from '../../components/statisticsListItem/StatisticListItem.jsx';
import './style.css';

const Statistics = () => {
  const { t } = useTranslation();
  const statistics = [
    { num: 2, text: t('statistics.years_experience') },
    { num: 16, text: t('statistics.projects_completed') },
    { num: 12, text: t('statistics.technologies_mastered') },
    { num: 2948, text: t('statistics.code_commits') },
  ];

  return (
    <section className="statistics">
      <h2 className="visually-hidden">
        Section with a professional statistics of the author
      </h2>
      <div className="container">
        <ul className="statistics__list">
          {statistics.map((stats, index) => (
            <StatisticListItem key={index + 1} stats={stats} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Statistics;
