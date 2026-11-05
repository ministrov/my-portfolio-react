import { useTranslation } from 'react-i18next';
import { m, AnimatePresence } from 'motion/react';
import { SLIDE_DOWN } from './animations';

const ContactFormField = ({
  field,
  value,
  error,
  disabled,
  onChange,
  onBlur,
  ref,
}) => {
  const { t } = useTranslation();
  const hasError = !!error;
  const fieldId = `contact-form-${field.name}`;
  const errorId = `${fieldId}-error`;
  const commonProps = {
    id: fieldId,
    name: field.name,
    placeholder: t(`contactForm.fields.${field.name}.placeholder`),
    value,
    onChange,
    onBlur,
    disabled,
    'aria-required': true,
    'aria-invalid': hasError || undefined,
    'aria-describedby': hasError ? errorId : undefined,
    ref,
  };

  return (
    <div
      className={[
        'contact-form__group',
        hasError ? 'contact-form__group--error' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <label className="contact-form__label" htmlFor={fieldId}>
        {t(`contactForm.fields.${field.name}.label`)}
        <span className="contact-form__required-mark" aria-hidden="true">
          {' '}
          *
        </span>
      </label>

      {field.tag === 'textarea' ? (
        <textarea
          {...commonProps}
          className="contact-form__textarea"
          rows={field.rows}
        />
      ) : (
        <input
          {...commonProps}
          className="contact-form__input"
          type={field.type}
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
            {error}
          </m.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactFormField;
