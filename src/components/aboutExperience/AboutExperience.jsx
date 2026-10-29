import { useTranslation } from 'react-i18next';
import Heading from '../heading/Heading';
import ResumeCard from '../resumeCard/ResumeCard';
import './style.css';

/**
 * Секция «Мой опыт» на /about: места работы карточками `ResumeCard`,
 * текущая работа — первой.
 *
 * Данные лежат не в `const/`, а в словарях: `aboutExperience.items` — массив
 * карточек, и порядок на странице задаёт сам массив. Каждый элемент —
 * готовые пропсы `ResumeCard` (`label`, `title`, `date`, `stages`), поэтому
 * передаётся целиком. Новое место работы — один объект в начале массива,
 * в `ru.json` и в `en.json`.
 *
 * @component
 * @returns {JSX.Element} Секция с заголовком и списком карточек опыта
 *
 * @example
 * <AboutExperience />
 */
const AboutExperience = () => {
  const { t } = useTranslation();
  const translated = t('aboutExperience.items', { returnObjects: true });
  // Потерянный ключ i18next возвращает строкой (самим ключом), а не массивом:
  // без проверки `.map` уронил бы всю страницу, с ней — список просто пуст
  const items = Array.isArray(translated) ? translated : [];

  return (
    <section className="about-experience" aria-labelledby="experience-heading">
      <div className="container">
        <div className="about-experience__wrapper">
          <Heading
            id="experience-heading"
            title={t('heading.experience.name')}
            accent={t('heading.experience.accent')}
          />

          <ul className="about-experience__experience-list">
            {items.map((item, index) => (
              // Индекс — корректный ключ: массив из словаря не
              // переупорядочивается и не фильтруется, а тексты в нём меняются
              // вместе с языком
              <li key={index}>
                <ResumeCard {...item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutExperience;
