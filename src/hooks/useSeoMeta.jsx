import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageProvider';

/** Базовый URL сайта для формирования абсолютных ссылок. */
const BASE_URL = 'https://antoshkindev.ru';

/** URL OG-изображения для превью в соцсетях (1200×630px). */
const OG_IMAGE = `${BASE_URL}/og-cover.png`;

/** Маппинг кодов языка в формат OG locale. */
const OG_LOCALE_MAP = { ru: 'ru_RU', en: 'en_US' };

/**
 * Хук для формирования SEO-мета ссылок текущей страницы.
 * Возвращает canonical URL, hreflang-ссылки и OG-локали для обоих языков.
 * Использует текущий маршрут из react-router и язык из контекста.
 *
 * @returns {Object} Объект с SEO-данными.
 * @property {string} canonical - Канонический URL текущей страницы (с ?lang=).
 * @property {string} ruUrl - URL русской версии текущей страницы.
 * @property {string} enUrl - URL английской версии текущей страницы.
 * @property {string} ogLocale - OG-локаль текущего языка (например, 'ru_RU').
 * @property {string} ogLocaleAlt - OG-локаль альтернативного языка.
 * @property {string} ogImage - URL OG-изображения для превью.
 *
 * @example
 * const { canonical, ruUrl, enUrl, ogLocale, ogImage } = useSeoMeta();
 * // canonical: 'https://antoshkindev.ru/about?lang=en'
 */
export const useSeoMeta = () => {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  const canonical = `${BASE_URL}${pathname}?lang=${lang}`;
  const ruUrl = `${BASE_URL}${pathname}?lang=ru`;
  const enUrl = `${BASE_URL}${pathname}?lang=en`;
  const ogLocale = OG_LOCALE_MAP[lang] ?? 'ru_RU';
  const ogLocaleAlt = lang === 'ru' ? OG_LOCALE_MAP.en : OG_LOCALE_MAP.ru;

  return { canonical, ruUrl, enUrl, ogLocale, ogLocaleAlt, ogImage: OG_IMAGE };
};
