import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { submitContactForm } from './contactApi';

/** Данные формы, как их передаёт хук. */
const FORM_DATA = {
  name: 'Антон',
  email: 'anton@example.com',
  subject: 'Сайт студии',
  message: 'Нужен лендинг для студии дизайна',
};

/**
 * Подделка ответа `fetch`: только то, что читает `submitContactForm`.
 * @param {*} body - Что вернёт `res.json()`.
 * @param {number} [status=200] - HTTP-статус.
 * @returns {{ ok: boolean, status: number, json: Function }} Объект ответа.
 */
const jsonResponse = (body, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: () => Promise.resolve(body),
});

describe('submitContactForm', () => {
  let fetchMock;

  beforeEach(() => {
    // Тестовый ключ вместо настоящего из .env.local: тесты не зависят от
    // окружения (на CI ключа нет), а настоящий ключ не попадает в их вывод.
    vi.stubEnv('VITE_WEB3FORMS_KEY', 'test-key');
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('отправляет POST на Web3Forms с JSON-заголовками', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ success: true }));

    await submitContactForm(FORM_DATA);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.web3forms.com/submit');
    expect(options.method).toBe('POST');
    expect(options.headers).toEqual({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  });

  it('кладёт в тело ключ доступа и все поля формы', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ success: true }));

    await submitContactForm(FORM_DATA);

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toEqual({ access_key: 'test-key', ...FORM_DATA });
  });

  it('при success: true отдаёт разобранный ответ сервиса', async () => {
    const answer = { success: true, message: 'Email sent successfully!' };
    fetchMock.mockResolvedValue(jsonResponse(answer));

    await expect(submitContactForm(FORM_DATA)).resolves.toEqual(answer);
  });

  // Web3Forms сообщает об отказе (неверный ключ, лимит) полем success, а
  // HTTP-статус при этом бывает и 200 — смотреть только на res.ok нельзя.
  it('при success: false с HTTP 200 бросает ошибку с текстом сервиса', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ success: false, message: 'invalid_access_key' })
    );

    await expect(submitContactForm(FORM_DATA)).rejects.toThrow(
      'invalid_access_key'
    );
  });

  it('при success: false без текста бросает ошибку с запасным сообщением', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ success: false }, 400));

    await expect(submitContactForm(FORM_DATA)).rejects.toThrow(
      'Web3Forms: неизвестная ошибка'
    );
  });

  it('пробрасывает сетевую ошибку fetch', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(submitContactForm(FORM_DATA)).rejects.toThrow(
      'Failed to fetch'
    );
  });

  it('пробрасывает ошибку, если тело ответа — не JSON', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 502,
      json: () => Promise.reject(new SyntaxError('Unexpected token <')),
    });

    await expect(submitContactForm(FORM_DATA)).rejects.toThrow(SyntaxError);
  });
});
