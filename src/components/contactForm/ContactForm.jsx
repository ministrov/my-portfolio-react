import { useTranslation } from 'react-i18next';
import { LazyMotion, domAnimation, AnimatePresence, m } from 'motion/react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';
import { useContactForm, FIELDS } from './useContactForm';
import CopyEmail from '../copyEmail/CopyEmail';
import ContactFormField from './ContactFormField';
import { FADE_UP, SLIDE_DOWN } from './animations';
import './style.css';

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
            <m.div
              key="success"
              className="contact-form__success"
              role="status"
              {...FADE_UP}
            >
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
                    <CopyEmail
                      email={t('contactForm.info.email')}
                      className="copy-email--danger"
                    />
                  </m.div>
                )}
              </AnimatePresence>

              {FIELDS.map((field) => {
                const hasError = touched[field.name] && !!errors[field.name];

                return (
                  <ContactFormField
                    key={field.name}
                    field={field}
                    value={values[field.name]}
                    error={
                      hasError
                        ? getErrorMsg(field.name, errors[field.name])
                        : null
                    }
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={(el) => {
                      fieldRefs.current[field.name] = el;
                    }}
                  />
                );
              })}

              <p className="contact-form__required-hint">
                {t('contactForm.requiredHint')}
              </p>

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
                {/* Иконка остаётся и во время отправки: именно она несёт
                    состояние «идёт отправка» (см. cf-send в style.css) */}
                {isSubmitting
                  ? t('contactForm.submitting')
                  : t('contactForm.submit')}
                <IoSend
                  className="contact-form__submit-icon"
                  aria-hidden="true"
                />
              </button>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
};

export default ContactForm;
