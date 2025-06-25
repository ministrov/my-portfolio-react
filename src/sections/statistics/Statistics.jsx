import StatisticListItem from '../../components/statisticsListItem/StatisticListItem.jsx';
import { statistics } from './statistics.js';
import './style.css';

const Statistics = () => {


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
