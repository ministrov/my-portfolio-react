import { useTranslation } from 'react-i18next';
// import { CgWebsite } from 'react-icons/cg';
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
              <strong>{t('advantages.items.first.start')}</strong>{' '}
              {t('advantages.items.first.end')}
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
              <strong>{t('advantages.items.second.start')}</strong>{' '}
              {t('advantages.items.second.end')}
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
              <strong>{t('advantages.items.third.start')}</strong>{' '}
              {t('advantages.items.third.end')}
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
              <strong>{t('advantages.items.fourth.start')}</strong>{' '}
              {t('advantages.items.fourth.end')}
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
              <strong>{t('advantages.items.fifth.start')}</strong>{' '}
              {t('advantages.items.fifth.end')}
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Advantages;
