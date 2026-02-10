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
                    Учебное заведение: "Московский Колледж Управления и Новых
                    Технологий"
                  </h3>
                  <time
                    className="about-education__date"
                    dateTime="2023-09/2023-11"
                  >
                    Sep 1998 — Jun 2002
                  </time>
                </header>
                <p className="about-education__item-text">
                  Специальность: "Информационные технологии и вычислительная
                  техника".
                </p>
              </article>
            </li>
            <li>
              <article className="about-education__item">
                <header className="about-education__head">
                  <h3 className="about-education__title">
                    Учебное заведение: "Онлайн академия HTML Academy"
                  </h3>
                  <time
                    className="about-education__date"
                    dateTime="2023-09/2023-11"
                  >
                    2021
                  </time>
                </header>
                <p className="about-education__item-text">
                  Специальность: "Профессиональная разработка веб-интерфейсов."
                </p>
              </article>
            </li>
            <li>
              <article className="about-education__item">
                <header className="about-education__head">
                  <h3 className="about-education__title">
                    Учебное заведение: "Курсы профессиональной подготовки HTML
                    Academy: React. Разработка сложных клиентских приложений."
                  </h3>
                  <time
                    className="about-education__date"
                    dateTime="2023-09/2023-11"
                  >
                    2024
                  </time>
                </header>
                <p className="about-education__item-text">
                  Специальность: "React. Разработка сложных клиентских
                  приложений."
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
