import { useTranslation } from 'react-i18next';
import { m, AnimatePresence } from 'motion/react';
import { SLIDE_DOWN } from './animations';

/**
 * Одно поле формы заявок: подпись, поле ввода или сообщения и ошибка под ним.
 *
 * Существует, потому что `input` и `textarea` формы совпадали в 11 атрибутах,
 * и любую правку поля приходилось делать дважды. Здесь общие атрибуты собраны
 * в один объект и раскладываются в тот тег, который задан в `field.tag`; свои
 * у каждого тега — только класс и `type` или `rows`.
 *
 * Поле знает только то, что показывает: готовый текст ошибки приходит пропом
 * `error`. Когда ошибку показывать и каким текстом — решают правила проверки
 * в {@link useContactForm}; `touched`, `errors` и `fieldRefs` сюда не попадают.
 *
 * Своего блока БЭМ у поля нет: оно лежит рядом с формой и рисуется её
 * классами `contact-form__*`. `LazyMotion` для `m.span` не нужен — поле всегда
 * внутри формы, а она уже обёрнута.
 *
 * Без ошибки `aria-invalid` не ставится вовсе (`|| undefined`): с `false`
 * React записал бы на страницу `aria-invalid="false"`.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {Object} props.field - Описание поля из `FIELDS`
 * @param {string} props.field.name - Имя поля: `name`, `email`, `subject`…
 * @param {string} props.field.tag - Тег: `input` или `textarea`
 * @param {string} [props.field.type] - Тип поля ввода, например `email`
 * @param {number} [props.field.rows] - Высота сообщения в строках
 * @param {string} props.value - Текст в поле
 * @param {string|null} props.error - Текст ошибки или `null`, если её нет
 * @param {boolean} props.disabled - Блокирует поле на время отправки
 * @param {Function} props.onChange - Обработчик ввода
 * @param {Function} props.onBlur - Обработчик ухода из поля
 * @param {React.Ref<HTMLInputElement|HTMLTextAreaElement>} props.ref
 *   Ссылка на элемент поля: по ней форма ставит курсор в первое поле с ошибкой
 * @returns {JSX.Element} Группа поля
 * @example
 * <ContactFormField
 *   key={field.name}
 *   field={field}
 *   value={values[field.name]}
 *   error={hasError ? getErrorMsg(field.name, errors[field.name]) : null}
 *   disabled={isSubmitting}
 *   onChange={handleChange}
 *   onBlur={handleBlur}
 *   ref={(el) => {
 *     fieldRefs.current[field.name] = el;
 *   }}
 * />
 */
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
