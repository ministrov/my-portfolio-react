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
                    datetime="2023-09/2023-11"
                  >
                    Sep 2021 — Nov 2023
                  </time>
                </header>
                <p className="about-experience__item-text">
                  WaterDel & TaskFlow Applications React, Redux Toolkit, REST
                  API - Построил CRUD-приложения комплексным управлением
                  состоянием. - Реализовал адаптивную верстку по методологии
                  mobile-first.
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
                    datetime="2023-09/2023-11"
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
                    datetime="2023-09/2023-11"
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

export default AboutExperience;
