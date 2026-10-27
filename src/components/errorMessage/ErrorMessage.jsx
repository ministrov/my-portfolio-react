import { Link, useLocation } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import Heading from '../heading/Heading';
import img from '../../assets/error.gif';
import './style.css';

/**
 * Читаемый вид адреса: браузер отдаёт `pathname` в percent-кодировке
 * (`/%D1%81…`), а показать нужно `/страница`. Битая последовательность
 * (`/100%`) бросает `URIError` — тогда адрес показывается как есть.
 *
 * @param {string} pathname - Путь из `useLocation()`.
 * @returns {string} Декодированный путь или исходный, если декодировать нельзя.
 */
const decodePath = (pathname) => {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
};

/**
 * Содержимое страницы 404: робот, ярлык «Ошибка 404», видимый h1, текст с
 * адресом, которого нет, и два выхода — на главную и к проектам.
 * Тексты берёт из словаря `errorMessage` сам; адрес — из текущего маршрута.
 *
 * @component
 * @returns {JSX.Element} Блок «Страница не найдена»
 *
 * @example
 * <section className="page-not-found" aria-labelledby="not-found-title">
 *   <ErrorMessage />
 * </section>
 */
const ErrorMessage = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const path = decodePath(pathname);

  return (
    <div className="container not-found">
      <img
        className="not-found__image"
        src={img}
        alt=""
        width="400"
        height="400"
        fetchPriority="high"
      />

      <p className="not-found__eyebrow">{t('errorMessage.eyebrow')}</p>

      <Heading
        level={1}
        id="not-found-title"
        className="not-found__title"
        title={t('errorMessage.title')}
        accent={t('errorMessage.accent')}
      />

      {/* Trans подставляет значение в строку до того, как разбирает её как
          разметку. Декодированный адрес может нести `<path style="…">`, и без
          экранирования React получил бы `style` строкой и упал. Поэтому
          значение экранируется, а текстовые узлы потом разэкранируются:
          адрес показан как текст, `/`, `&`, кавычки и `<>` — как есть.
          Исключение — плейсхолдер `{{path}}` в самом адресе: Trans
          подставляет его повторно (`//{{path}}`), это косметика. */}
      <p className="not-found__text">
        <Trans
          i18nKey="errorMessage.text"
          values={{ path }}
          components={{ path: <span className="not-found__path" /> }}
          tOptions={{ interpolation: { escapeValue: true } }}
          shouldUnescape
        />
      </p>

      <div className="not-found__actions">
        <Link className="not-found__primary" to="/">
          {t('errorMessage.home')}
        </Link>

        <Link className="not-found__secondary" to="/projects">
          {t('errorMessage.projects')}
          <span className="not-found__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ErrorMessage;
