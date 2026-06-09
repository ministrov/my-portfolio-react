import { useTranslation } from 'react-i18next';
import Heading from '../heading/Heading';
import { education } from '../../const';
import './style.css';

/**
 * Компонент секции "Образование".
 * Отображает список образовательных учреждений с датами и описаниями.
 * Использует переводы через react-i18next.
 *
 * @component
 * @returns {JSX.Element} Секция образования
 */
const AboutEducation = () => {
  const { t } = useTranslation();

  return (
    <section className="about-education">
      <div className="container">
        <div className="about-education__wrapper">
          <Heading
            variant="display"
            title={t('heading.education.name')}
            accent={t('heading.education.accent')}
          />

          <ul className="about-education__education-list">
            {education.map((item) => (
              <li key={item.id}>
                <article className="about-education__item">
                  <header className="about-education__head">
                    <h3 className="about-education__title">
                      {t(item.titleKey)}
                    </h3>
                    <span className="about-education__date">
                      {t(item.dateKey)}
                    </span>
                  </header>
                  <p className="about-education__item-text">
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

export default AboutEducation;
