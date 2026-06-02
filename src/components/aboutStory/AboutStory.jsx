import { useTranslation, Trans } from 'react-i18next';
import './style.css';

/**
 * Именованные компоненты-обёртки для <Trans>.
 * Сохраняют стилизацию фрагментов текста при переводе: подсветка ключевых фраз
 * (`mark`), технологический стек (`stack`) и призыв к действию (`cta`).
 * Соответствующие теги (`<mark>`, `<stack>`, `<cta>`) используются в строках словарей.
 */
const RICH_COMPONENTS = {
  mark: <mark className="about-story__mark" />,
  stack: <strong className="about-story__stack" />,
  cta: <span className="about-story__cta" />,
};

/**
 * Компонент AboutStory — секция «Обо мне» в три смысловых слоя
 * (результат → подход → факты).
 *
 * Текст локализован через i18next, а стилизованные фрагменты сохраняются при
 * переводе с помощью `<Trans>` и именованных компонентов из {@link RICH_COMPONENTS}.
 * Акцент на типографике и нативном CSS: буквица, цветовые маркеры слоёв и
 * растущая подсветка ключевых фраз.
 *
 * @component
 * @example
 * return <AboutStory />
 *
 * @returns {JSX.Element} Секция «Обо мне»
 */
const AboutStory = () => {
  const { t } = useTranslation();

  return (
    <section className="about-story">
      <h2 className="visually-hidden">{t('aboutStory.srHeading')}</h2>

      <article className="about-story__card">
        <p className="about-story__para about-story__para--1">
          <Trans i18nKey="aboutStory.para1" components={RICH_COMPONENTS} />
        </p>

        <p className="about-story__para about-story__para--2">
          <Trans i18nKey="aboutStory.para2" components={RICH_COMPONENTS} />
        </p>

        <p className="about-story__para about-story__para--3">
          <Trans i18nKey="aboutStory.para3" components={RICH_COMPONENTS} />
        </p>
      </article>
    </section>
  );
};

export default AboutStory;
