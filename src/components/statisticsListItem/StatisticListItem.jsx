import CountUp from 'react-countup';
import './style.css';

const StatisticListItem = ({ stats }) => {
  return (
    <li className="statistics__item">
        <CountUp
            end={stats.num}
            duration={5}
            delay={2}
            className="statistics__count"
        />
        <p className={`statistics__desc ${stats.text.length < 15 ? "max-width-100" : "max-width-150"}`}>
        {stats.text}
        </p>
    </li>
  )
}

export default StatisticListItem;