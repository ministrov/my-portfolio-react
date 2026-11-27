import { describe, it, expect, vi } from 'vitest';
import createResourcesToBackend from './resourcesToBackend';

/**
 * Запускает `read` и отдаёт результат промисом — так же, как это делает
 * backendConnector i18next.
 * @param {Object} backend - Backend из `createResourcesToBackend`.
 * @param {string} language - Код языка.
 * @returns {Promise<Object>} Данные namespace'а или ошибка.
 */
const read = (backend, language) =>
  new Promise((resolve, reject) => {
    backend.read(language, 'translation', (error, data) =>
      error ? reject(error) : resolve(data)
    );
  });

describe('createResourcesToBackend', () => {
  it('отдаёт собранный в бандл язык синхронно, не трогая загрузчики', () => {
    const loaders = { en: vi.fn() };
    const bundled = { ru: { 'mainNav.home': 'Главная' } };
    const backend = createResourcesToBackend({ bundled, loaders });
    const callback = vi.fn();

    backend.read('ru', 'translation', callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, bundled.ru);
    expect(loaders.en).not.toHaveBeenCalled();
  });

  it('грузит ленивый язык и отдаёт его default-экспорт', async () => {
    const en = { 'mainNav.home': 'Home' };
    const backend = createResourcesToBackend({
      loaders: { en: () => Promise.resolve({ default: en }) },
    });

    await expect(read(backend, 'en')).resolves.toBe(en);
  });

  it('сообщает ошибку для языка без ресурсов', async () => {
    const backend = createResourcesToBackend({ bundled: { ru: {} } });

    await expect(read(backend, 'klingon')).rejects.toBeInstanceOf(Error);
  });

  // Чанк языка может не приехать: сеть, блокировщик, файл удалён новым
  // деплоем. Ошибка обязана дойти до i18next, а не потеряться в промис-цепочке.
  it('пробрасывает ошибку загрузчика', async () => {
    const failure = new Error('chunk failed');
    const backend = createResourcesToBackend({
      loaders: { en: () => Promise.reject(failure) },
    });

    await expect(read(backend, 'en')).rejects.toBe(failure);
  });
});
