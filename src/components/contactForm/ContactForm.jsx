import { useTranslation } from 'react-i18next';
import { LazyMotion, domAnimation, AnimatePresence, m } from 'framer-motion';
import PropTypes from 'prop-types';
import { BsCheckCircleFill } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';
import { useContactForm, FIELDS } from './useContactForm';
import './style.css';

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
 * Форма обратной связи — чистый рендер без логики.
 * Вся логика (стейт, валидация, отправка) — в useContactForm.
 * API-слой (fetch) — в src/api/contactApi.js.
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
  const {
    values,
    touched,
    errors,
    status,
    fieldRefs,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    getErrorMsg,
  } = useContactForm(onSuccess);

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
