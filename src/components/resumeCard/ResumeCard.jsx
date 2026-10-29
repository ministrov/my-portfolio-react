import './style.css';

/**
 * Этап внутри карточки: период работы в одной должности или на одном проекте.
 *
 * @typedef {Object} ResumeStage
 * @property {string} summary - Сводка этапа одной фразой (обязательна; она же
 *   ключ React, поэтому внутри карточки сводки не повторяются)
 * @property {string} [date] - Даты этапа, «Ноябрь 2024 — настоящее время».
 *   Нет — строка дат не выводится (у карточки с одним этапом хватает дат карточки)
 * @property {string[]} [points] - Пункты под сводкой: результаты и обязанности.
 *   Нет или пустой массив — списка нет
 */

/**
 * Карточка резюме — общая для опыта (`AboutExperience`) и образования
 * (`AboutEducation`) на /about.
 *
 * Анатомия сверху вниз (термины `DESIGN.md` → Typography):
 * - **Label** — компания или учебное заведение, прописными, Graphite;
 * - **Headline** — должность или программа, Oswald 600, Carbon (не кобальт:
 *   текст карточки — текст, а не ссылка);
 * - **Meta** — даты карточки: справа от заголовка в той же строке, на ≤ 768 px — под ним;
 * - этапы (`stages`): дата этапа, сводка и пункты списком; между этапами — тонкая линия;
 * - **Body** — один абзац (`text`), когда этапы не нужны (образование).
 *
 * Все тексты — **уже переведённые строки, не ключи i18n**: компонент не вызывает
 * `t()`, переводит родитель (`t('aboutExperience.items', { returnObjects: true })`).
 * Заголовок карточки — `h3`: родительская секция открывается `h2` (`Heading`).
 * Внешнюю геометрию (место в списке, отступы между карточками) задаёт родитель
 * классом-миксом в `className` — сама карточка её не знает.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {string} props.title - Заголовок: должность или программа обучения
 * @param {string} props.date - Даты карточки целиком, «Декабрь 2023 — настоящее время»
 * @param {string} [props.label] - Подпись над заголовком: компания или учебное
 *   заведение. Нет — подписи нет (фриланс)
 * @param {ResumeStage[]} [props.stages] - Этапы по порядку, сверху вниз
 * @param {string} [props.text] - Абзац под заголовком — для карточек без этапов.
 *   Если переданы и этапы, абзац встаёт после них
 * @param {string} [props.className=''] - Класс-микс родителя для внешней геометрии
 * @returns {JSX.Element} Карточка `article` с заголовком, датами и содержимым
 *
 * @example
 * // Опыт: компания, должность, два этапа с пунктами
 * <ResumeCard
 *   label="ООО «Сервис Маркет»"
 *   title="Frontend-разработчик"
 *   date="Декабрь 2023 — настоящее время"
 *   stages={[
 *     {
 *       date: 'Ноябрь 2024 — настоящее время',
 *       summary: 'Разрабатываю и поддерживаю e-commerce платформу…',
 *       points: ['Спроектировал и внедрил виджет отзывов…', 'Слежу за Core Web Vitals…'],
 *     },
 *     { date: 'Декабрь 2023 — ноябрь 2024', summary: 'В составе фронтенд-команды…' },
 *   ]}
 *   className="about-experience__item"
 * />
 *
 * @example
 * // Образование: учебное заведение, программа и абзац вместо этапов
 * <ResumeCard
 *   label="PurpleSchool"
 *   title="Профессия Backend-разработчик на Python"
 *   date="Июнь 2026 — настоящее время"
 *   text="Целенаправленно расширяю компетенции в сторону backend-разработки…"
 * />
 */
const ResumeCard = ({ label, title, date, stages, text, className = '' }) => {
  // Склейка через filter: без className в классе не появится «undefined»
  const classes = ['resume-card', className].filter(Boolean).join(' ');

  return (
    <article className={classes}>
      {label && <p className="resume-card__label">{label}</p>}

      <header className="resume-card__head">
        <h3 className="resume-card__title">{title}</h3>
        <span className="resume-card__date">{date}</span>
      </header>

      {stages?.map((stage) => (
        <div className="resume-card__stage" key={stage.summary}>
          {stage.date && (
            <p className="resume-card__stage-date">{stage.date}</p>
          )}
          <p className="resume-card__summary">{stage.summary}</p>

          {stage.points?.length > 0 && (
            // role="list" — не дубль: при list-style: none (глобально у li в
            // main.css) Safari с VoiceOver перестаёт объявлять «список, 3 пункта»
            <ul className="resume-card__points" role="list">
              {stage.points.map((point) => (
                <li className="resume-card__point" key={point}>
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {text && <p className="resume-card__text">{text}</p>}
    </article>
  );
};

export default ResumeCard;
