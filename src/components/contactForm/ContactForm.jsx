import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyMotion, domAnimation, AnimatePresence, m } from 'framer-motion';
import PropTypes from 'prop-types';
import { BsCheckCircleFill } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';
import './style.css';

/** Начальные значения полей формы. */
const INITIAL_VALUES = { name: '', email: '', subject: '', message: '' };

/**
 * Правила валидации для каждого поля.
 * required — обязательное поле; minLength — минимальная длина; isEmail — email-формат.
 */
const RULES = {
  name: { required: true, minLength: 2 },
  email: { required: true, isEmail: true },
  subject: { required: true, minLength: 3 },
  message: { required: true, minLength: 20 },
};

/** Конфигурация полей формы: порядок рендера и тип элемента. */
const FIELDS = [
  { name: 'name', type: 'text', tag: 'input' },
  { name: 'email', type: 'email', tag: 'input' },
  { name: 'subject', type: 'text', tag: 'input' },
  { name: 'message', tag: 'textarea', rows: 5 },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Валидирует значение поля по его правилам.
 * @param {string} name - Имя поля.
 * @param {string} value - Текущее значение.
 * @returns {string|null} Ключ ошибки или null если всё верно.
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

/** Анимация fade + сдвиг вверх — для блока успеха и формы. */
const FADE_UP = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
};

/** Анимация slide-down — для inline-ошибок и баннера. */
const SLIDE_DOWN = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.18 },
};

/**
 * Форма обратной связи с клиентской валидацией и отправкой через Web3Forms.
 * Состояния: idle → submitting → success | error.
 *
 * @component
 * @param {Object}   props
 * @param {Function} [props.onSuccess] - Коллбек при успешной отправке.
 * @returns {JSX.Element}
 * @example
 * <ContactForm onSuccess={() => console.log('sent')} />
 */
const ContactForm = ({ onSuccess }) => {
  const { t } = useTranslation();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const fieldRefs = useRef({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = Object.keys(INITIAL_VALUES).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {}
    );
    setTouched(allTouched);

    const allErrors = Object.keys(INITIAL_VALUES).reduce((acc, k) => {
      const err = validateField(k, values[k]);
      if (err) acc[k] = err;
      return acc;
    }, {});
    setErrors(allErrors);

    if (Object.keys(allErrors).length > 0) {
      const firstErrName = FIELDS.find((f) => allErrors[f.name])?.name;
      if (firstErrName) fieldRefs.current[firstErrName]?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.REACT_APP_WEB3FORMS_KEY,
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        onSuccess?.();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setTouched({});
    setErrors({});
    setStatus('idle');
  };

  /** Возвращает локализованное сообщение об ошибке. */
  const getErrorMsg = (name, errorKey) => {
    if (errorKey === 'minLength') {
      return t('contactForm.errors.minLength', {
        count: RULES[name].minLength,
      });
    }
    return t(`contactForm.errors.${errorKey}`);
  };

  const isSubmitting = status === 'submitting';

  return (
    <LazyMotion features={domAnimation}>
      <div className="contact-form">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <m.div key="success" className="contact-form__success" {...FADE_UP}>
              <BsCheckCircleFill
                className="contact-form__success-icon"
                aria-hidden="true"
              />
              <h3 className="contact-form__success-title">
                {t('contactForm.successTitle')}
              </h3>
              <p className="contact-form__success-text">
                {t('contactForm.successText')}
              </p>
              <button
                type="button"
                className="contact-form__reset"
                onClick={handleReset}
              >
                {t('contactForm.successReset')}
              </button>
            </m.div>
          ) : (
            <m.form
              key="form"
              className="contact-form__form"
              onSubmit={handleSubmit}
              noValidate
              {...FADE_UP}
            >
              <AnimatePresence>
                {status === 'error' && (
                  <m.div
                    key="error-banner"
                    className="contact-form__error-banner"
                    role="alert"
                    {...SLIDE_DOWN}
                  >
                    {t('contactForm.errorText')}{' '}
                    <a href={`mailto:${t('contactForm.info.email')}`}>
                      {t('contactForm.info.email')}
                    </a>
                  </m.div>
                )}
              </AnimatePresence>

              {FIELDS.map((field) => {
                const hasError = touched[field.name] && !!errors[field.name];
                const fieldId = `contact-form-${field.name}`;
                const errorId = `${fieldId}-error`;

                return (
                  <div
                    key={field.name}
                    className={[
                      'contact-form__group',
                      hasError ? 'contact-form__group--error' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <label className="contact-form__label" htmlFor={fieldId}>
                      {t(`contactForm.fields.${field.name}.label`)}
                    </label>

                    {field.tag === 'textarea' ? (
                      <textarea
                        id={fieldId}
                        name={field.name}
                        className="contact-form__textarea"
                        rows={field.rows}
                        placeholder={t(
                          `contactForm.fields.${field.name}.placeholder`
                        )}
                        value={values[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        aria-invalid={hasError || undefined}
                        aria-describedby={hasError ? errorId : undefined}
                        ref={(el) => {
                          fieldRefs.current[field.name] = el;
                        }}
                      />
                    ) : (
                      <input
                        id={fieldId}
                        name={field.name}
                        type={field.type}
                        className="contact-form__input"
                        placeholder={t(
                          `contactForm.fields.${field.name}.placeholder`
                        )}
                        value={values[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        aria-invalid={hasError || undefined}
                        aria-describedby={hasError ? errorId : undefined}
                        ref={(el) => {
                          fieldRefs.current[field.name] = el;
                        }}
                      />
                    )}

                    <AnimatePresence>
                      {hasError && (
                        <m.span
                          key="error"
                          id={errorId}
                          className="contact-form__field-error"
                          role="alert"
                          {...SLIDE_DOWN}
                        >
                          {getErrorMsg(field.name, errors[field.name])}
                        </m.span>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <button
                type="submit"
                className={[
                  'contact-form__submit',
                  isSubmitting ? 'contact-form__submit--loading' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  t('contactForm.submitting')
                ) : (
                  <>
                    {t('contactForm.submit')}
                    <IoSend
                      className="contact-form__submit-icon"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
};

ContactForm.propTypes = {
  /** Коллбек при успешной отправке формы. */
  onSuccess: PropTypes.func,
};

export default ContactForm;
