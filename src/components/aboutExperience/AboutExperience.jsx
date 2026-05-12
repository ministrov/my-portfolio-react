import { useTranslation } from 'react-i18next';
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

  // Массив данных для элементов опыта
  const experienceItems = [
    {
      id: 1,
      titleKey: 'aboutExperience.titleOne',
      dateKey: 'aboutExperience.dateOne',
      dateTimeKey: 'aboutExperience.dateTimeOne',
      textKey: 'aboutExperience.textOne',
      hasCompany: false, // У первого элемента нет названия компании
    },
    {
      id: 2,
      titleKey: 'aboutExperience.titleTwo',
      dateKey: 'aboutExperience.dateTwo',
      dateTimeKey: 'aboutExperience.dateTimeTwo',
      textKey: 'aboutExperience.textTwo',
      hasCompany: true,
    },
    {
      id: 3,
      titleKey: 'aboutExperience.titleThree',
      dateKey: 'aboutExperience.dateThree',
      dateTimeKey: 'aboutExperience.dateTimeThree',
      textKey: 'aboutExperience.textThree',
      hasCompany: true,
    },
  ];

  return (
    <section className="about-experience">
      <div className="container">
        <div className="about-experience__wrapper">
          <Heading title={t('heading.experience.name')} />

          <ul className="about-experience__experience-list">
            {experienceItems.map((item) => (
              <li key={item.id}>
                <article className="about-experience__item">
                  <header className="about-experience__head">
                    <h3 className="about-experience__title">
                      {t(item.titleKey)}
                    </h3>
                    <time
                      className="about-experience__date"
                      dateTime={t(item.dateTimeKey)}
                    >
                      {t(item.dateKey)}
                    </time>
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
