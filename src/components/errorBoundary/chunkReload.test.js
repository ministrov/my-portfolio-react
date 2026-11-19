import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  isChunkLoadError,
  canAutoReload,
  autoReload,
  RELOAD_FLAG_KEY,
} from './chunkReload';
import { reloadPage } from './reloadPage';

// В jsdom location.reload не работает и не подменяется — подменяем модуль
vi.mock('./reloadPage', () => ({ reloadPage: vi.fn() }));

describe('isChunkLoadError', () => {
  it.each([
    [
      'Chrome и Edge',
      'Failed to fetch dynamically imported module: https://antonzhilin.ru/assets/AboutPage-NUqbqjsg.js',
    ],
    [
      'Firefox',
      'error loading dynamically imported module: https://antonzhilin.ru/assets/AboutPage-NUqbqjsg.js',
    ],
    ['Safari', 'Importing a module script failed.'],
    ['Vite, CSS страницы', 'Unable to preload CSS for /assets/AboutPage.css'],
  ])('узнаёт сбой загрузки файла: %s', (_, message) => {
    expect(isChunkLoadError(new TypeError(message))).toBe(true);
  });

  it('обычная ошибка рендера — не сбой загрузки', () => {
    const error = new TypeError(
      "Cannot read properties of undefined (reading 'map')"
    );
    expect(isChunkLoadError(error)).toBe(false);
  });

  it('не падает на том, что не похоже на ошибку', () => {
    expect(isChunkLoadError(null)).toBe(false);
    expect(isChunkLoadError(undefined)).toBe(false);
    expect(
      isChunkLoadError('Failed to fetch dynamically imported module')
    ).toBe(false);
  });
});

describe('автоперезагрузка', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.mocked(reloadPage).mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    sessionStorage.clear();
  });

  it('первый сбой в сессии: ставит метку и перезагружает', () => {
    expect(canAutoReload()).toBe(true);

    autoReload();

    expect(sessionStorage.getItem(RELOAD_FLAG_KEY)).toBe('1');
    expect(reloadPage).toHaveBeenCalledTimes(1);
  });

  it('метка уже стоит — сама больше не перезагружает', () => {
    sessionStorage.setItem(RELOAD_FLAG_KEY, '1');

    expect(canAutoReload()).toBe(false);
  });

  it('хранилище недоступно — без автоперезагрузки, иначе был бы цикл', () => {
    const blocked = () => {
      throw new DOMException('The operation is insecure.', 'SecurityError');
    };
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(blocked);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(blocked);

    expect(canAutoReload()).toBe(false);
    autoReload();
    expect(reloadPage).not.toHaveBeenCalled();
  });
});
