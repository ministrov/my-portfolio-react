import { useTranslation } from 'react-i18next';
import Heading from '../heading/Heading';
import ResumeCard from '../resumeCard/ResumeCard';
import './style.css';

/**
 * Секция «Моё образование» на /about: учёба карточками `ResumeCard`,
 * текущая — первой.
 *
 * Данные лежат не в `const/`, а в словарях: `aboutEducation.items` — массив
 * карточек, и порядок на странице задаёт сам массив. Каждый элемент —
 * готовые пропсы `ResumeCard` (`label`, `title`, `date`, у текущей учёбы ещё
 * `text`), поэтому передаётся целиком. Новое обучение — один объект в начале
 * массива, в `ru.json` и в `en.json`.
 *
 * @component
 * @returns {JSX.Element} Секция с заголовком и списком карточек образования
 *
 * @example
 * <AboutEducation />
 */
const AboutEducation = () => {
  const { t } = useTranslation();
  const translated = t('aboutEducation.items', { returnObjects: true });
  // Если ключ i18next не найден, он вернёт строку, а не массив,
  // поэтому без проверки .map уронит страницу.
  const items = Array.isArray(translated) ? translated : [];

  return (
    <section className="about-education" aria-labelledby="education-heading">
      <div className="container">
        <div className="about-education__wrapper">
          <Heading
            id="education-heading"
            title={t('heading.education.name')}
            accent={t('heading.education.accent')}
          />

          <ul className="about-education__education-list">
            {items.map((item, index) => (
              // Индекс — корректный ключ: так как массив статичный и не изменяется,
              // элементы списка не удаляются и не добавляются
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

export default AboutEducation;
