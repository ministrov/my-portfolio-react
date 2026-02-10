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

          <div className="about-experience__experience">
            <div className="about-experience__item">
              <header className="about-experience__head">
                <h3 className="about-experience__title">Freelance Developer</h3>

                <data value="Sep 2023 — Nov 2023 ">Sep 2023 — Nov 2023</data>
              </header>
              <p className="about-experience__item-text">
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur.
              </p>
            </div>
            <div className="about-experience__item">
              <header className="about-experience__head">
                <h3 className="about-experience__title">Front-End Intern</h3>

                <data value="Sep 2023 — Nov 2023">Nov 2023 — Present</data>
              </header>
              <p className="about-experience__item-text">
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutExperience;
