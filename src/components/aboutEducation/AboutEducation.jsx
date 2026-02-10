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

          <ul className="about-experience__experience-list">
            <li>
              <article className="about-experience__item">
                <header className="about-experience__head">
                  <h3 className="about-experience__title">
                    Учебное заведение: "Московский Колледж Управления и Новых
                    Технологий"
                  </h3>
                  <time
                    className="about-experience__date"
                    dateTime="2023-09/2023-11"
                  >
                    Sep 1998 — Jun 2002
                  </time>
                </header>
                <p className="about-experience__item-text">
                  Специальность: "Информационные технологии и вычислительная
                  техника".
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
                <p className="about-experience__name">ООО "Сервис Маркет"</p>
                <p className="about-experience__item-text">
                  В составе команды разработал высоконагруженное веб-приложение
                  для интернет-магазина Вам Вода — масштабируемую e-commerce
                  платформу, успешно обслуживающую 20 000+ активных
                  пользователей ежемесячно! Отвечал за верстку.
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
                <p className="about-experience__name">ООО "Сервис Маркет"</p>
                <p className="about-experience__item-text">
                  Как Frontend Developer в ООО «Сервис Маркет» занимаюсь
                  разработкой акционных лендингов, которые помогают запускать и
                  усиливать маркетинговые кампании компании. Фокусируюсь на
                  быстрой, аккуратной верстке и внедрении решений, повышающих
                  конверсию и вовлеченность пользователей. Поддерживаю и
                  развиваю существующую фронтенд-инфраструктуру, оптимизируя
                  скорость загрузки и стабильность работы текущих проектов.
                  Активно взаимодействую с командой маркетинга и
                  бэкенд-разработчиками, чтобы оперативно выводить на рынок
                  новые офферы и улучшать ключевые продуктовые метрики.
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
