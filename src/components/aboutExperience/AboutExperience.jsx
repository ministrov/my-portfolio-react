import { useTranslation } from 'react-i18next';
import { experienceItems } from '../../const';
import Heading from '../heading/Heading';
import './style.css';

/**
 * Компонент секции "Мой опыт" (AboutExperience).
 * Отображает список профессионального опыта с заголовками, датами, названием компании и описанием.
 * Использует переводы через react-i18next для поддержки мультиязычности.
 *
 * @component
 * @example
 * return (
 *   <AboutExperience />
 * )
 */
const AboutExperience = () => {
  const { t } = useTranslation();

  return (
    <section className="about-experience">
      <div className="container">
        <div className="about-experience__wrapper">
          <Heading
            variant="display"
            title={t('heading.experience.name')}
            accent={t('heading.experience.accent')}
          />

          <ul className="about-experience__experience-list">
            {experienceItems.map((item) => (
              <li key={item.id}>
                <article className="about-experience__item">
                  <header className="about-experience__head">
                    <h3 className="about-experience__title">
                      {t(item.titleKey)}
                    </h3>
                    <span className="about-experience__date">
                      {t(item.dateKey)}
                    </span>
                  </header>
                  {item.hasCompany && (
                    <p className="about-experience__name">
                      {t('aboutExperience.name')}
                    </p>
                  )}
                  <p className="about-experience__item-text">
                    {t(item.textKey)}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutExperience;
