/**
 * Backend i18next поверх статических и динамических импортов.
 *
 * Язык по умолчанию (`ru`) лежит в главном чанке и отдаётся без сети — старт
 * приложения остаётся синхронным. Остальные языки подъезжают отдельными
 * чанками: на старте, если такой язык выбран, или при первом переключении.
 * Так главный бандл не везёт словарь, которым не пользуется (S04-T04).
 *
 * Backend нужен не ради самого импорта, а ради момента переключения:
 * `i18next.changeLanguage` завершается только после чтения из backend, и
 * слушатель `languageChanged` (на него подписан react-i18next) получает уже
 * готовые переводы. Без backend'а страница на время загрузки чанка показала
 * бы сырые ключи вместо текста.
 *
 * Ошибку чтения i18next не считает фатальной: `init` в этом случае всё равно
 * завершается, а страница остаётся на языке из `fallbackLng`. Поэтому
 * неудачная загрузка чанка не даёт белого экрана.
 *
 * @example
 * // В utils/i18n/index.js
 * i18n.use(
 *   createResourcesToBackend({
 *     bundled: { ru: RuLang },
 *     loaders: { en: () => import('./locales/en/en.json') },
 *   })
 * );
 *
 * @param {Object} config
 * @param {Record<string, Object>} [config.bundled={}] — языки, уже собранные
 *   в бандл: отдаются синхронно, загрузчик для них не вызывается
 * @param {Record<string, () => Promise<{ default: Object }>>} [config.loaders={}]
 *   — ленивые импорты остальных языков
 * @returns {{ type: 'backend', init: Function, read: Function }} backend i18next
 */
const createResourcesToBackend = ({ bundled = {}, loaders = {} } = {}) => ({
  type: 'backend',

  /** Обязательный для backend'а i18next метод: настроек у нас нет. */
  init() {},

  /**
   * Отдаёт ресурсы одного языка в namespace.
   * Собранный язык отдаётся сразу, ленивый — после промиса загрузчика.
   *
   * @param {string} language - Код языка (`ru`, `en`).
   * @param {string} _namespace - Namespace i18next; не используется, но его
   *   место в сигнатуре задаёт i18next.
   * @param {(error: Error|null, data: Object|null) => void} callback -
   *   Колбэк i18next: данные — объект namespace'а, не обёрнутый в язык.
   * @returns {void}
   */
  read(language, _namespace, callback) {
    if (bundled[language]) {
      callback(null, bundled[language]);
      return;
    }

    const load = loaders[language];

    if (!load) {
      callback(new Error(`Нет ресурсов для языка «${language}»`), null);
      return;
    }

    load()
      .then((module) => callback(null, module.default))
      .catch((error) => callback(error, null));
  },
});

export default createResourcesToBackend;
