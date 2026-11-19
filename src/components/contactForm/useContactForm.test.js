import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import { submitContactForm } from '../../api/contactApi';
import { useContactForm, FIELDS } from './useContactForm';

// Транспорт подменён: здесь проверяется логика хука, а не HTTP —
// запросы проверяет contactApi.test.js.
vi.mock('../../api/contactApi', () => ({ submitContactForm: vi.fn() }));

/** Значения, которые проходят все правила. */
const VALID = {
  name: 'Антон',
  email: 'anton@example.com',
  subject: 'Сайт студии',
  message: 'Нужен лендинг для студии дизайна',
};

/**
 * Событие поля в том виде, в каком его читает хук.
 * @param {string} name - Имя поля.
 * @param {string} value - Значение.
 * @returns {{ target: { name: string, value: string } }} Событие.
 */
const fieldEvent = (name, value) => ({ target: { name, value } });

/**
 * Событие отправки формы с мок-`preventDefault`.
 * @returns {{ preventDefault: Function }} Событие.
 */
const submitEvent = () => ({ preventDefault: vi.fn() });

/**
 * Рендерит хук и подкладывает в `fieldRefs` поддельные поля с мок-`focus`:
 * хук фокусирует поле через ref, а настоящего DOM в renderHook нет.
 * @param {Function} [onSuccess] - Внешний коллбек успеха.
 * @returns {{ result: { current: ReturnType<typeof useContactForm> }, focus: Object<string, Function> }}
 */
const setup = (onSuccess) => {
  const { result } = renderHook(() => useContactForm(onSuccess));
  const focus = {};
  FIELDS.forEach(({ name }) => {
    focus[name] = vi.fn();
    result.current.fieldRefs.current[name] = { focus: focus[name] };
  });
  return { result, focus };
};

/**
 * Вводит значения в поля.
 * @param {{ current: ReturnType<typeof useContactForm> }} result - Результат renderHook.
 * @param {Object<string, string>} values - Имя поля → значение.
 */
const fill = (result, values) => {
  Object.entries(values).forEach(([name, value]) => {
    act(() => result.current.handleChange(fieldEvent(name, value)));
  });
};

/**
 * Обещание, которое тест разрешает или отклоняет сам, — чтобы застать
 * форму в состоянии «отправляем».
 * @returns {{ promise: Promise, resolve: Function, reject: Function }}
 */
const deferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

describe('useContactForm', () => {
  beforeEach(() => {
    vi.mocked(submitContactForm).mockReset();
  });

  it('стартует пустой формой в статусе idle', () => {
    const { result } = setup();

    expect(result.current.values).toEqual({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    expect(result.current.touched).toEqual({});
    expect(result.current.errors).toEqual({});
    expect(result.current.status).toBe('idle');
    expect(result.current.isSubmitting).toBe(false);
  });

  describe('валидация', () => {
    it('ввод в нетронутое поле меняет значение, но ошибку не показывает', () => {
      const { result } = setup();

      fill(result, { name: 'А' });

      expect(result.current.values.name).toBe('А');
      expect(result.current.errors.name).toBeUndefined();
    });

    it('пустое поле при уходе фокуса до первой отправки ошибкой не помечается', () => {
      const { result } = setup();

      act(() => result.current.handleBlur(fieldEvent('name', '')));

      expect(result.current.touched.name).toBe(true);
      expect(result.current.errors.name).toBeUndefined();
    });

    it.each([
      ['name', 'А', 'minLength'],
      ['email', 'anton@example', 'email'],
      ['email', 'anton example.com', 'email'],
      ['subject', 'Ок', 'minLength'],
      ['message', 'Слишком коротко', 'minLength'],
    ])(
      'поле %s со значением «%s» при уходе фокуса — ошибка %s',
      (name, value, error) => {
        const { result } = setup();

        act(() => result.current.handleBlur(fieldEvent(name, value)));

        expect(result.current.errors[name]).toBe(error);
      }
    );

    it('длину и email проверяет без пробелов по краям', () => {
      const { result } = setup();

      act(() => result.current.handleBlur(fieldEvent('name', '  А  ')));
      act(() =>
        result.current.handleBlur(fieldEvent('email', '  anton@example.com  '))
      );

      expect(result.current.errors.name).toBe('minLength');
      expect(result.current.errors.email).toBeNull();
    });

    it('в тронутом поле перепроверяет значение на каждый ввод', () => {
      const { result } = setup();

      act(() => result.current.handleBlur(fieldEvent('email', 'anton@')));
      expect(result.current.errors.email).toBe('email');

      fill(result, { email: VALID.email });
      expect(result.current.errors.email).toBeNull();

      fill(result, { email: '' });
      expect(result.current.errors.email).toBe('required');
    });
  });

  describe('отправка с ошибками', () => {
    it('помечает все поля тронутыми, показывает ошибки и не вызывает API', async () => {
      const { result } = setup();
      const event = submitEvent();

      await act(() => result.current.handleSubmit(event));

      expect(event.preventDefault).toHaveBeenCalled();
      expect(result.current.touched).toEqual({
        name: true,
        email: true,
        subject: true,
        message: true,
      });
      expect(result.current.errors).toEqual({
        name: 'required',
        email: 'required',
        subject: 'required',
        message: 'required',
      });
      expect(result.current.status).toBe('idle');
      expect(submitContactForm).not.toHaveBeenCalled();
    });

    it('фокусирует первое по порядку поле с ошибкой', async () => {
      const { result, focus } = setup();
      fill(result, { ...VALID, email: 'anton@', message: 'Коротко' });

      await act(() => result.current.handleSubmit(submitEvent()));

      expect(focus.email).toHaveBeenCalledTimes(1);
      expect(focus.name).not.toHaveBeenCalled();
      expect(focus.message).not.toHaveBeenCalled();
    });

    it('после попытки отправки пустое поле при уходе фокуса — ошибка required', async () => {
      const { result } = setup();
      fill(result, VALID);
      fill(result, { name: '' });
      // Отправка с пустым именем — с этого момента «обязательное» показывается и на blur
      await act(() => result.current.handleSubmit(submitEvent()));
      fill(result, { name: VALID.name });
      expect(result.current.errors.name).toBeNull();

      act(() => result.current.handleBlur(fieldEvent('subject', '')));

      expect(result.current.errors.subject).toBe('required');
    });
  });

  describe('отправка валидной формы', () => {
    it('передаёт в API ровно четыре поля и проходит submitting → success', async () => {
      const request = deferred();
      vi.mocked(submitContactForm).mockReturnValue(request.promise);
      const onSuccess = vi.fn();
      const { result } = setup(onSuccess);
      fill(result, VALID);

      let submitting;
      act(() => {
        submitting = result.current.handleSubmit(submitEvent());
      });

      expect(result.current.status).toBe('submitting');
      expect(result.current.isSubmitting).toBe(true);
      expect(submitContactForm).toHaveBeenCalledWith(VALID);
      expect(onSuccess).not.toHaveBeenCalled();

      await act(async () => {
        request.resolve({ success: true });
        await submitting;
      });

      expect(result.current.status).toBe('success');
      expect(result.current.isSubmitting).toBe(false);
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    it('при отказе API переходит в error, значения полей сохраняет', async () => {
      vi.mocked(submitContactForm).mockRejectedValue(
        new Error('invalid_access_key')
      );
      const onSuccess = vi.fn();
      const { result } = setup(onSuccess);
      fill(result, VALID);

      await act(() => result.current.handleSubmit(submitEvent()));

      expect(result.current.status).toBe('error');
      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.values).toEqual(VALID);
      expect(onSuccess).not.toHaveBeenCalled();
    });

    it('без onSuccess успешная отправка не падает', async () => {
      vi.mocked(submitContactForm).mockResolvedValue({ success: true });
      const { result } = setup();
      fill(result, VALID);

      await act(() => result.current.handleSubmit(submitEvent()));

      expect(result.current.status).toBe('success');
    });
  });

  it('handleReset возвращает форму в начальное состояние', async () => {
    vi.mocked(submitContactForm).mockResolvedValue({ success: true });
    const { result } = setup();
    fill(result, VALID);
    await act(() => result.current.handleSubmit(submitEvent()));

    act(() => result.current.handleReset());

    expect(result.current.values).toEqual({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    expect(result.current.touched).toEqual({});
    expect(result.current.errors).toEqual({});
    expect(result.current.status).toBe('idle');

    // Сброшен и признак попытки отправки: пустое поле на blur снова без ошибки
    act(() => result.current.handleBlur(fieldEvent('name', '')));
    expect(result.current.errors.name).toBeUndefined();
  });

  describe('getErrorMsg', () => {
    it.each([
      ['name', 'minLength', 'Минимум 2 символов'],
      ['subject', 'minLength', 'Минимум 3 символов'],
      ['message', 'minLength', 'Минимум 20 символов'],
      ['email', 'email', 'Введите корректный email'],
      ['name', 'required', 'Обязательное поле'],
    ])('поле %s, ошибка %s — «%s»', (name, errorKey, text) => {
      const { result } = setup();

      expect(result.current.getErrorMsg(name, errorKey)).toBe(text);
    });
  });
});
