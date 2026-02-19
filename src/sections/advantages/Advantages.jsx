import { useTranslation, Trans } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import website from '../../assets/svg/website.svg';
import deploy from '../../assets/png/deploy.png';
import reactIcon from '../../assets/svg/react-js.svg';
import seo from '../../assets/png/seo.png';
import bug from '../../assets/png/bag.png';
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
              src={website}
              width="56"
              height="56"
              alt=""
            />
            <p className="advantages__item-text">
              <Trans
                i18nKey="advantages.items.first"
                components={{ hightlight: <strong /> }}
              />
            </p>
          </li>
          <li className="advantages__item">
            <img
              className="advantages__item-img"
              src={deploy}
              width="56"
              height="56"
              alt=""
            />
            <p className="advantages__item-text">
              <Trans
                i18nKey="advantages.items.second"
                components={{ hightlight: <strong /> }}
              />
            </p>
          </li>
          <li className="advantages__item">
            <img
              className="advantages__item-img"
              src={reactIcon}
              width="56"
              height="56"
              alt=""
            />
            <p className="advantages__item-text">
              <Trans
                i18nKey="advantages.items.third"
                components={{ hightlight: <strong /> }}
              />
            </p>
          </li>
          <li className="advantages__item">
            <img
              className="advantages__item-img"
              src={seo}
              width="56"
              height="56"
              alt=""
            />
            <p className="advantages__item-text">
              <Trans
                i18nKey="advantages.items.fourth"
                components={{ hightlight: <strong /> }}
              />
            </p>
          </li>
          <li className="advantages__item">
            <img
              className="advantages__item-img"
              src={bug}
              width="56"
              height="56"
              alt=""
            />
            <p className="advantages__item-text">
              <Trans
                i18nKey="advantages.items.fifth"
                components={{ hightlight: <strong /> }}
              />
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Advantages;
