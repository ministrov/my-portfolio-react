import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { submitContactForm } from '../../api/contactApi';

/**
 * @module useContactForm
 * @description Хук формы обратной связи — изолирует стейт, валидацию и отправку от JSX.
 * Компонент ContactForm использует только то, что хук возвращает — и ничего не знает
 * о деталях реализации (правилах, fetch, обработке ошибок).
 */

/** Начальные значения всех полей. */
const INITIAL_VALUES = { name: '', email: '', subject: '', message: '' };

/**
 * Правила валидации. Ключ — имя поля, значение — набор ограничений.
 * required: поле обязательно; minLength: минимум символов; isEmail: проверка формата.
 */
const RULES = {
  name: { required: true, minLength: 2 },
  email: { required: true, isEmail: true },
  subject: { required: true, minLength: 3 },
  message: { required: true, minLength: 20 },
};

/**
 * Конфигурация полей формы — порядок рендера и тип элемента.
 * Экспортируется: ContactForm использует FIELDS для рендера списка полей.
 */
export const FIELDS = [
  { name: 'name', type: 'text', tag: 'input' },
  { name: 'email', type: 'email', tag: 'input' },
  { name: 'subject', type: 'text', tag: 'input' },
  { name: 'message', tag: 'textarea', rows: 5 },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Валидирует одно поле против его правила.
 * @param {string} name - Имя поля.
 * @param {string} value - Текущее значение.
 * @returns {string|null} Ключ ошибки ('required' | 'email' | 'minLength') или null.
 */
function validateField(name, value) {
  const rule = RULES[name];
  if (!rule) return null;
  const trimmed = value.trim();
  if (rule.required && !trimmed) return 'required';
  if (rule.isEmail && !EMAIL_RE.test(trimmed)) return 'email';
  if (rule.minLength && trimmed.length < rule.minLength) return 'minLength';
  return null;
}

/**
 * Хук управления формой обратной связи.
 *
 * --- Как здесь работает async/await ---
 *
 * handleSubmit помечен как `async`. Это значит: когда React вызывает его
 * (пользователь нажал Submit), функция стартует синхронно — делает валидацию,
 * вызывает setStatus('submitting') — React сразу перерисовывает кнопку как задизейбленную.
 * Потом доходит до `await submitContactForm(...)` и «засыпает»: отдаёт управление
 * браузеру. Браузер в это время выполняет fetch, рендерит анимации, реагирует на события.
 * Когда сервер ответит — Promise разрешается, handleSubmit «просыпается» со следующей строки
 * и вызывает setStatus('success') или setStatus('error') → React рендерит результат.
 *
 * Важно: `async` функция не блокирует UI. Весь React продолжает работать пока идёт запрос.
 *
 * @param {Function} [onSuccess] - Внешний коллбек при успешной отправке.
 * @returns {{ values, touched, errors, status, fieldRefs, isSubmitting,
 *             handleChange, handleBlur, handleSubmit, handleReset, getErrorMsg }}
 */
export function useContactForm(onSuccess) {
  const { t } = useTranslation();

  // Четыре независимых стейта — каждый отвечает за свой слой данных формы:
  const [values, setValues] = useState(INITIAL_VALUES); // текущий текст в полях
  const [touched, setTouched] = useState({}); // какие поля уже трогали
  const [errors, setErrors] = useState({}); // ключи ошибок по полям
  const [status, setStatus] = useState('idle'); // idle|submitting|success|error

  // ref не вызывает перерендер — используем для доступа к DOM-элементам полей
  const fieldRefs = useRef({});

  /** Обновляет значение поля; если поле уже тронуто — перевалидирует сразу. */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Показываем ошибку «на лету» только если поле уже было тронуто —
    // иначе ошибка вспыхивала бы с первого символа, раздражая пользователя
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  /** Помечает поле как «тронутое» при потере фокуса и сразу валидирует. */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  /**
   * Обрабатывает отправку формы.
   * async: запускает цепочку асинхронных операций не блокируя UI.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Отменяем нативное поведение формы (перезагрузку страницы)

    // Помечаем все поля как тронутые — чтобы показать ошибки на всех незаполненных
    const allTouched = Object.keys(INITIAL_VALUES).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {}
    );
    setTouched(allTouched);

    // Прогоняем все поля через validateField и собираем только ненулевые ошибки
    const allErrors = Object.keys(INITIAL_VALUES).reduce((acc, k) => {
      const err = validateField(k, values[k]);
      if (err) acc[k] = err;
      return acc;
    }, {});
    setErrors(allErrors);

    console.log('[useContactForm] Сабмит. Значения полей:', values);
    console.log('[useContactForm] Ошибки валидации:', allErrors);

    if (Object.keys(allErrors).length > 0) {
      // Есть ошибки — fetch не запускаем, фокусируем первое проблемное поле
      console.warn('[useContactForm] Валидация не прошла. Запрос отменён.');
      const firstErrName = FIELDS.find((f) => allErrors[f.name])?.name;
      if (firstErrName) fieldRefs.current[firstErrName]?.focus();
      return;
    }

    // Валидация прошла — переходим в состояние «отправляем»
    // setStatus здесь синхронный: React поставит перерендер в очередь,
    // но выполнит его только после того как handleSubmit отдаст управление (на ближайшем await)
    console.log('[useContactForm] Валидация OK → статус: submitting');
    setStatus('submitting');

    try {
      // await: здесь функция «засыпает» до ответа сервера.
      // Пока спит — React рендерит кнопку с классом --loading, анимации работают.
      // submitContactForm бросит Error если сеть недоступна или Web3Forms вернул success:false
      await submitContactForm({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      });

      // Сюда попадаем только если Promise разрешился без исключения (отправка успешна)
      console.log('[useContactForm] Отправка успешна → статус: success');
      setStatus('success');
      onSuccess?.(); // Вызываем внешний коллбек если передан
    } catch (error) {
      // Promise был отклонён — либо сетевая ошибка, либо бизнес-ошибка из contactApi
      console.error(
        '[useContactForm] Ошибка отправки → статус: error. Причина:',
        error.message
      );
      setStatus('error');
    }
  };

  /** Сбрасывает форму в начальное состояние. */
  const handleReset = () => {
    console.log('[useContactForm] Форма сброшена → статус: idle');
    setValues(INITIAL_VALUES);
    setTouched({});
    setErrors({});
    setStatus('idle');
  };

  /** Возвращает локализованное сообщение об ошибке для поля. */
  const getErrorMsg = (name, errorKey) => {
    if (errorKey === 'minLength') {
      return t('contactForm.errors.minLength', {
        count: RULES[name].minLength,
      });
    }
    return t(`contactForm.errors.${errorKey}`);
  };

  return {
    values,
    touched,
    errors,
    status,
    fieldRefs,
    isSubmitting: status === 'submitting',
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    getErrorMsg,
  };
}
