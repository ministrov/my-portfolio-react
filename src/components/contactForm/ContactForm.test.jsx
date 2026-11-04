import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import i18n from '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import ContactForm from './ContactForm';

/**
 * Тесты формы целиком: хук, разметка и транспорт вместе, подменён только
 * `fetch`. Поля ищутся по роли и доступному имени, а не по классам и
 * вложенности: так тесты переживут вынос поля в отдельный компонент (S03-T09).
 */

/** Значения, которые проходят все правила. */
const VALID = {
  name: 'Антон',
  email: 'anton@example.com',
  subject: 'Сайт студии',
  message: 'Нужен лендинг для студии дизайна',
};

/** Подписи полей в русской версии — доступные имена полей. */
const LABELS = {
  name: 'Ваше имя',
  email: 'Email',
  subject: 'Тема',
  message: 'Сообщение',
};

/**
 * Поле по доступному имени: подпись без декоративной звёздочки.
 * @param {string} name - Подпись поля.
 * @returns {HTMLElement} Поле ввода.
 */
const field = (name) => screen.getByRole('textbox', { name });

/**
 * Кнопка отправки в русской версии.
 * @returns {HTMLElement} Кнопка.
 */
const submitButton = () =>
  screen.getByRole('button', { name: 'Отправить сообщение' });

/**
 * Вводит значения во все поля формы.
 * @param {Object<string, string>} values - Имя поля → значение.
 */
const fillForm = (values) => {
  Object.entries(values).forEach(([name, value]) => {
    fireEvent.change(field(LABELS[name]), { target: { value } });
  });
};

/**
 * Подделка ответа `fetch` с JSON-телом.
 * @param {*} body - Что вернёт `res.json()`.
 * @returns {{ ok: boolean, status: number, json: Function }} Объект ответа.
 */
const jsonResponse = (body) => ({
  ok: true,
  status: 200,
  json: () => Promise.resolve(body),
});

describe('ContactForm', () => {
  let fetchMock;

  beforeEach(() => {
    // Тестовый ключ вместо настоящего из .env.local — см. contactApi.test.js
    vi.stubEnv('VITE_WEB3FORMS_KEY', 'test-key');
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(async () => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    await act(() => i18n.changeLanguage('ru'));
  });

  describe('idle: начальный вид', () => {
    it('у каждого поля есть подпись, все поля обязательные и без ошибок', () => {
      render(<ContactForm />);

      Object.values(LABELS).forEach((label) => {
        const input = field(label);
        expect(input).toHaveAttribute('aria-required', 'true');
        expect(input).not.toHaveAttribute('aria-invalid');
        expect(input).not.toHaveAttribute('aria-describedby');
        expect(input).toHaveValue('');
      });
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('имя, email и тема — input, сообщение — textarea', () => {
      render(<ContactForm />);

      expect(field('Ваше имя').tagName).toBe('INPUT');
      expect(field('Email')).toHaveAttribute('type', 'email');
      expect(field('Тема').tagName).toBe('INPUT');
      expect(field('Сообщение').tagName).toBe('TEXTAREA');
    });

    it('звёздочка обязательности скрыта от скринридера, подсказка о ней видна', () => {
      render(<ContactForm />);

      expect(screen.getAllByText('*')).toHaveLength(4);
      screen
        .getAllByText('*')
        .forEach((mark) => expect(mark).toHaveAttribute('aria-hidden', 'true'));
      expect(screen.getByText('* — обязательное поле')).toBeInTheDocument();
    });
  });

  describe('ошибки валидации', () => {
    it('пустая отправка: поля помечены, ошибка связана с полем, фокус на первом', async () => {
      render(<ContactForm />);

      fireEvent.click(submitButton());

      for (const label of Object.values(LABELS)) {
        const input = field(label);
        await waitFor(() =>
          expect(input).toHaveAccessibleDescription('Обязательное поле')
        );
        expect(input).toHaveAttribute('aria-invalid', 'true');
      }
      expect(screen.getAllByRole('alert')).toHaveLength(4);
      expect(field('Ваше имя')).toHaveFocus();
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('короткое сообщение — ошибка с числом символов из правила', async () => {
      render(<ContactForm />);
      fillForm({ ...VALID, message: 'Коротко' });

      fireEvent.click(submitButton());

      expect(
        await screen.findByText('Минимум 20 символов')
      ).toBeInTheDocument();
      expect(field('Сообщение')).toHaveFocus();
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('исправленное поле теряет ошибку и связь с ней', async () => {
      render(<ContactForm />);
      fillForm({ ...VALID, email: 'anton@' });
      fireEvent.click(submitButton());
      await waitFor(() =>
        expect(field('Email')).toHaveAccessibleDescription(
          'Введите корректный email'
        )
      );

      fillForm({ email: VALID.email });

      expect(field('Email')).not.toHaveAttribute('aria-invalid');
      expect(field('Email')).not.toHaveAttribute('aria-describedby');
      await waitFor(() =>
        expect(
          screen.queryByText('Введите корректный email')
        ).not.toBeInTheDocument()
      );
    });
  });

  it('submitting: кнопка и поля заблокированы, на кнопке «Отправляем...»', async () => {
    let answer;
    fetchMock.mockReturnValue(
      new Promise((resolve) => {
        answer = resolve;
      })
    );
    render(<ContactForm />);
    fillForm(VALID);

    fireEvent.click(submitButton());

    const button = await screen.findByRole('button', { name: 'Отправляем...' });
    expect(button).toBeDisabled();
    Object.values(LABELS).forEach((label) =>
      expect(field(label)).toBeDisabled()
    );

    await act(async () => answer(jsonResponse({ success: true })));
  });

  it('success: экран благодарности вместо формы, «Написать ещё» возвращает пустую форму', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ success: true }));
    const onSuccess = vi.fn();
    render(<ContactForm onSuccess={onSuccess} />);
    fillForm(VALID);

    fireEvent.click(submitButton());

    expect(
      await screen.findByRole('heading', { name: 'Сообщение отправлено!' })
    ).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(
      'Спасибо! Постараюсь ответить в течение 24 часов.'
    );
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(onSuccess).toHaveBeenCalledTimes(1);

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toEqual({ access_key: 'test-key', ...VALID });

    fireEvent.click(screen.getByRole('button', { name: 'Написать ещё' }));

    expect(
      await screen.findByRole('textbox', { name: 'Ваше имя' })
    ).toHaveValue('');
    expect(field('Сообщение')).toHaveValue('');
  });

  describe('error: отказ отправки', () => {
    it('Web3Forms ответил success: false — баннер с адресом почты, текст в полях сохранён', async () => {
      fetchMock.mockResolvedValue(
        jsonResponse({ success: false, message: 'invalid_access_key' })
      );
      const onSuccess = vi.fn();
      render(<ContactForm onSuccess={onSuccess} />);
      fillForm(VALID);

      fireEvent.click(submitButton());

      const banner = await screen.findByRole('alert');
      expect(banner).toHaveTextContent(
        'Что-то пошло не так. Попробуйте позже или напишите напрямую:'
      );
      expect(banner).toHaveTextContent('ministrov2018@gmail.com');
      expect(field('Сообщение')).toHaveValue(VALID.message);
      expect(submitButton()).toBeEnabled();
      expect(onSuccess).not.toHaveBeenCalled();
    });

    it('сетевая ошибка — тот же баннер; повторная отправка проходит', async () => {
      fetchMock
        .mockRejectedValueOnce(new TypeError('Failed to fetch'))
        .mockResolvedValueOnce(jsonResponse({ success: true }));
      render(<ContactForm />);
      fillForm(VALID);

      fireEvent.click(submitButton());
      expect(await screen.findByRole('alert')).toHaveTextContent(
        'Что-то пошло не так.'
      );

      fireEvent.click(submitButton());

      expect(
        await screen.findByRole('heading', { name: 'Сообщение отправлено!' })
      ).toBeInTheDocument();
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });
  });

  it('в английской версии те же поля, кнопка и ошибки — по-английски', async () => {
    await act(() => i18n.changeLanguage('en'));
    render(<ContactForm />);

    ['Your name', 'Email', 'Subject', 'Message'].forEach((label) =>
      expect(field(label)).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));

    await waitFor(() =>
      expect(field('Your name')).toHaveAccessibleDescription(
        'This field is required'
      )
    );
    expect(screen.getByText('* — required field')).toBeInTheDocument();
  });
});
