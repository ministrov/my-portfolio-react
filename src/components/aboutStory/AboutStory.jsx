import './style.css';

/**
 * Данные легенды «как читается по слоям».
 * Каждый слой связан с одноимённым абзацем через модификатор `--{id}`.
 * @type {{ id: number, label: string, note: string }[]}
 */

/**
 * Компонент AboutStory — единая версия секции «Обо мне» в три смысловых слоя
 * (результат → подход → факты) с интерактивной легендой.
 *
 * Акцент сделан на типографике и нативном CSS: буквица, цветовые маркеры слоёв,
 * подсветка ключевых фраз и перекрёстная подсветка «абзац ↔ легенда» через `:has()`.
 *
 * @component
 * @example
 * return <AboutStory />
 *
 * @returns {JSX.Element} Секция «Обо мне» с легендой слоёв
 */
const AboutStory = () => {
  return (
    <section className="about-story">
      <h2 className="visually-hidden">
        Единая версия секции «Обо мне» для одной страницы портфолио, выстроенная
        в три слоя: результат, подход, факты.
      </h2>

      <article className="about-story__card">
        <p className="about-story__para about-story__para--1">
          Фронтенд-разработчик из Москвы. Превращаю идею в работающий продукт —
          интерфейс, который одинаково удобно открывается с телефона, планшета и
          десктопа и не теряет пользователя на мелочах. Делаю чисто, до уровня{' '}
          <mark className="about-story__mark">pixel perfect</mark>, потому что
          эстетика и удобство — это не отделка, а часть результата.
        </p>

        <p className="about-story__para about-story__para--2">
          За аккуратной картинкой — надёжная инженерия:{' '}
          <strong className="about-story__stack">
            Next.js (Pages/App Router), TypeScript, RTK Query, React i18next,
            CSS Modules, mobile-first
          </strong>
          . Забочусь о скорости (оптимизирую{' '}
          <mark className="about-story__mark">Core Web Vitals</mark>) и о том,
          чтобы продукт был доступен каждому (
          <mark className="about-story__mark">WCAG 2.1</mark>). Работаю в
          Agile/Scrum с CI/CD.
        </p>

        <p className="about-story__para about-story__para--3">
          Уровень <mark className="about-story__mark">Middle</mark> подтверждён
          на чемпионате HTML Academy.{' '}
          <mark className="about-story__mark">English B2</mark>. Готов к офису,
          гибриду или удалёнке.{' '}
          <span className="about-story__cta">
            Расскажете, что нужно сделать?
          </span>
        </p>
      </article>
    </section>
  );
};

export default AboutStory;
