import CountUp from 'react-countup';
import { statistics } from '../../data/stats.js';
import './style.css';

const Statistics = () => {
  return (
    <section className="statistics">
      <h2 className="visually-hidden">Section for a Statistics</h2>
      <div className="container">
        <div className="statistics__list">
          {statistics.map((stats, index) => (
            <div className="statistics__item" key={index + 1}>
              <CountUp
                end={stats.num}
                duration={5}
                delay={2}
                className="statistics__count"
              />
              <p className={`statistics__desc ${stats.text.length < 15 ? "max-width-100" : "max-width-150"}`}>
                {stats.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Statistics;