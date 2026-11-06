import { useTranslation } from 'react-i18next';
import { reloadPage } from './reloadPage';
import './style.css';

/**
 * Запасной экран {@link ErrorBoundary}: что случилось и кнопка «Обновить
 * страницу». Тексты — из словаря `errorBoundary`, свои для сбоя загрузки
 * файла («пропал интернет или сайт обновился») и для ошибки рендера.
 *
 * Два вида:
 * - `page` — вместо страницы: ярлык «Ошибка», видимый `h1`, текст и кнопка,
 *   одной колонкой по центру, как страница 404;
 * - `section` — на месте секции главной: текст и кнопка, без заголовка —
 *   заголовок `h1` у страницы уже есть.
 *
 * Экран не зависит ни от чего, что может не загрузиться: без `Heading`, без
 * картинки (после выкладки старого файла с хешем уже нет), стили лежат в
 * главном CSS. `role="alert"` — экран появляется внезапно, вместо
 * содержимого, и скринридер должен его объявить.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {('page'|'section')} [props.variant='page'] - Вид экрана
 * @param {boolean} [props.isChunkError=false] - Не загрузился файл сборки
 * @returns {JSX.Element} Запасной экран
 * @example
 * <ErrorFallback variant="section" isChunkError />
 */
const ErrorFallback = ({ variant = 'page', isChunkError = false }) => {
  const { t } = useTranslation();
  const reason = isChunkError ? 'chunk' : 'render';

  const reloadButton = (
    <button
      type="button"
      className="error-fallback__button"
      onClick={reloadPage}
    >
      {t('errorBoundary.reload')}
    </button>
  );

  if (variant === 'section') {
    return (
      <div
        className="container error-fallback error-fallback--section"
        role="alert"
      >
        <p className="error-fallback__text">
          {t(`errorBoundary.section.${reason}`)}
        </p>
        {reloadButton}
      </div>
    );
  }

  return (
    <section
      className="error-fallback error-fallback--page"
      aria-labelledby="error-fallback-title"
    >
      <div className="container error-fallback__inner" role="alert">
        <p className="error-fallback__eyebrow">{t('errorBoundary.eyebrow')}</p>
        <h1 id="error-fallback-title" className="error-fallback__title">
          {t(`errorBoundary.${reason}.title`)}
        </h1>
        <p className="error-fallback__text">
          {t(`errorBoundary.${reason}.text`)}
        </p>
        {reloadButton}
      </div>
    </section>
  );
};

export default ErrorFallback;
