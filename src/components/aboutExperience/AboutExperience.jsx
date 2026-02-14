import { useTranslation } from 'react-i18next';
import Heading from '../heading/Heading';
import './style.css';

const AboutExperience = () => {
  const { t } = useTranslation();

  return (
    <section className="about-experience">
      <div className="container">
        <div className="about-experience__wrapper">
          <Heading title={t('heading.experience.name')} />

          <ul className="about-experience__experience-list">
            <li>
              <article className="about-experience__item">
                <header className="about-experience__head">
                  <h3 className="about-experience__title">
                    Freelance Developer
                  </h3>
                  <time
                    className="about-experience__date"
                    dateTime="2023-09/2023-11"
                  >
                    Sep 2021 — Nov 2023
                  </time>
                </header>
                <p className="about-experience__item-text">
                  {t('aboutExperience.textOne')}
                </p>
              </article>
            </li>
            <li>
              <article className="about-experience__item">
                <header className="about-experience__head">
                  <h3 className="about-experience__title">
                    Frontend Developer Intern
                  </h3>
                  <time
                    className="about-experience__date"
                    dateTime="2023-09/2023-11"
                  >
                    Nov 2023 — Nov 2024
                  </time>
                </header>
                <p className="about-experience__name">
                  {t('aboutExperience.name')}
                </p>
                <p className="about-experience__item-text">
                  {t('aboutExperience.textTwo')}
                </p>
              </article>
            </li>
            <li>
              <article className="about-experience__item">
                <header className="about-experience__head">
                  <h3 className="about-experience__title">
                    Frontend Developer
                  </h3>
                  <time
                    className="about-experience__date"
                    dateTime="2023-09/2023-11"
                  >
                    Nov 2024 — Present
                  </time>
                </header>
                <p className="about-experience__name">
                  {t('aboutExperience.name')}
                </p>
                <p className="about-experience__item-text">
                  {t('aboutExperience.textThree')}
                </p>
              </article>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutExperience;
