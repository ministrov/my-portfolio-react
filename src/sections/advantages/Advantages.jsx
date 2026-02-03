import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import icon from '../../assets/svg/advantages-icon.svg';
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

        <ul className="advantages__list">
          <li className="advantages__item">
            <img
              className="advantages__item-img"
              src={icon}
              width="56"
              height="56"
              alt=""
            />
            <p className="advantages__item-text">
              <strong>Легкий и быстрый</strong> сайт.
            </p>
          </li>
          <li className="advantages__item">
            <img
              className="advantages__item-img"
              src={icon}
              width="56"
              height="56"
              alt=""
            />
            <p className="advantages__item-text">
              <strong>Быстрая</strong> разработка и деплой.
            </p>
          </li>
          <li className="advantages__item">
            <img
              className="advantages__item-img"
              src={icon}
              width="56"
              height="56"
              alt=""
            />
            <p className="advantages__item-text">
              <strong>Чистый современный код</strong> без legacy.
            </p>
          </li>
          <li className="advantages__item">
            <img
              className="advantages__item-img"
              src={icon}
              width="56"
              height="56"
              alt=""
            />
            <p className="advantages__item-text">
              <strong>Гарантия</strong> производительности и SEO.
            </p>
          </li>
          <li className="advantages__item">
            <img
              className="advantages__item-img"
              src={icon}
              width="56"
              height="56"
              alt=""
            />
            <p className="advantages__item-text">
              <strong>Надежный код</strong> без багов и проблем.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Advantages;
