import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import './style.css';

const Advantages = () => {
  const { t } = useTranslation();
  return (
    <section className="advantages">
      <div className="container">
        <Heading
          title={t('heading.problems.name')}
          slogan={t('heading.problems.subheading')}
        />

        <ul className="advantages__list">
          <li className="advantages__item">
            <img
              className="advantages__item-img"
              // src="icons/advantages-icon-1.svg"
              width="56"
              height="56"
              alt=""
            />
            <p className="advantages__item-text">
              Легкий и быстрый сайт на Next.js
            </p>
          </li>
          <li className="advantages__item">
            <img
              className="advantages__item-img"
              // src="icons/advantages-icon-2.svg"
              width="56"
              height="56"
              alt=""
            />
            <p className="advantages__item-text">
              <strong>Быстрая</strong> разработка и деплой
            </p>
          </li>
          <li className="advantages__item">
            <img
              className="advantages__item-img"
              // src="icons/advantages-icon-3.svg"
              width="56"
              height="56"
              alt=""
            />
            <p className="advantages__item-text">
              Чистый современный код без legacy
            </p>
          </li>
          <li className="advantages__item">
            <img
              className="advantages__item-img"
              // src="icons/advantages-icon-4.svg"
              width="56"
              height="56"
              alt=""
            />
            <p className="advantages__item-text">
              Гарантия производительности и SEO
            </p>
          </li>
          <li className="advantages__item">
            <img
              className="advantages__item-img"
              // src="icons/advantages-icon-5.svg"
              width="56"
              height="56"
              alt=""
            />
            <p className="advantages__item-text">
              Надежный код без багов и проблем
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Advantages;
