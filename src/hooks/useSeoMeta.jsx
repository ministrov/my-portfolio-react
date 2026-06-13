import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageProvider';

/** Базовый URL сайта для формирования абсолютных ссылок. */
const BASE_URL = 'https://antoshkindev.ru';

/**
 * Хук для формирования SEO-мета ссылок текущей страницы.
 * Возвращает canonical URL и hreflang-ссылки для обоих языков.
 * Использует текущий маршрут из react-router и язык из контекста.
 *
 * @returns {Object} Объект с SEO-ссылками.
 * @property {string} canonical - Канонический URL текущей страницы (с ?lang=).
 * @property {string} ruUrl - URL русской версии текущей страницы.
 * @property {string} enUrl - URL английской версии текущей страницы.
 *
 * @example
 * const { canonical, ruUrl, enUrl } = useSeoMeta();
 * // canonical: 'https://antoshkindev.ru/about?lang=en'
 */
export const useSeoMeta = () => {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  const canonical = `${BASE_URL}${pathname}?lang=${lang}`;
  const ruUrl = `${BASE_URL}${pathname}?lang=ru`;
  const enUrl = `${BASE_URL}${pathname}?lang=en`;

  return { canonical, ruUrl, enUrl };
};
