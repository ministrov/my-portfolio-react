import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resolveInitialLang } from '../lang';
import RuLang from './locales/ru/ru.json';
import createResourcesToBackend from './resourcesToBackend';

/**
 * Промис готовности i18next. Для `ru` он разрешается сразу: словарь лежит в
 * главном чанке. Для `en` — после загрузки словаря отдельным чанком, поэтому
 * `src/index.jsx` ждёт его перед первой отрисовкой.
 *
 * @type {Promise<Function>}
 */
export const i18nReady = i18n
  .use(initReactI18next)
  .use(
    createResourcesToBackend({
      bundled: { ru: RuLang },
      loaders: {
        en: () => import('./locales/en/en.json'),
      },
    })
  )
  .init({
    // В главном чанке — только язык по умолчанию. Английский словарь
    // подъезжает отдельным чанком: на старте, если выбран `?lang=en` или
    // сохранён в localStorage, либо при первом переключении на EN.
    resources: {
      ru: {
        translation: RuLang,
      },
    },
    // Без этого флага i18next считает `resources` полным набором языков и не
    // ходит в backend за остальными.
    partialBundledLanguages: true,
    fallbackLng: 'ru',
    // Приоритет URL → localStorage → 'ru' живёт в utils/lang.
    // Тот же резолвер задаёт начальное состояние LanguageProvider, поэтому оба
    // слоя стартуют с одним языком и не перебивают друг друга.
    lng: resolveInitialLang(),

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
