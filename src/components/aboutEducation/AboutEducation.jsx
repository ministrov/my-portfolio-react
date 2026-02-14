import { useTranslation } from 'react-i18next';
import Heading from '../heading/Heading';
import './style.css';

const AboutEducation = () => {
  const { t } = useTranslation();

  return (
    <section className="about-education">
      <div className="container">
        <div className="about-education__wrapper">
          <Heading title={t('heading.education.name')} />

          <ul className="about-education__education-list">
            <li>
              <article className="about-education__item">
                <header className="about-education__head">
                  <h3 className="about-education__title">
                    {t('aboutEducation.titleOne')}
                  </h3>
                  <time
                    className="about-education__date"
                    dateTime="2023-09/2023-11"
                  >
                    {t('aboutEducation.dateOne')}
                  </time>
                </header>
                <p className="about-education__item-text">
                  {t('aboutEducation.textOne')}
                </p>
              </article>
            </li>
            <li>
              <article className="about-education__item">
                <header className="about-education__head">
                  <h3 className="about-education__title">
                    {t('aboutEducation.titleTwo')}
                  </h3>
                  <time
                    className="about-education__date"
                    dateTime="2023-09/2023-11"
                  >
                    {t('aboutEducation.dateTwo')}
                  </time>
                </header>
                <p className="about-education__item-text">
                  {t('aboutEducation.textTwo')}
                </p>
              </article>
            </li>
            <li>
              <article className="about-education__item">
                <header className="about-education__head">
                  <h3 className="about-education__title">
                    {t('aboutEduction.titleThree')}
                  </h3>
                  <time
                    className="about-education__date"
                    dateTime="2023-09/2023-11"
                  >
                    {t('aboutEducation.dateThree')}
                  </time>
                </header>
                <p className="about-education__item-text">
                  {t('aboutEducation.textThree')}
                </p>
              </article>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutEducation;
