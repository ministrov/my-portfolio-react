import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useGoToContacts from '../../hooks/useGoToContacts';
import './style.css';

/**
 * Переиспользуемая CTA-кнопка «Обсудить проект».
 * Ведёт к контактам с любой страницы (`useGoToContacts`): где секция есть —
 * прокрутка, где нет (404) — переход на главную к контактам. Используется в
 * шапке, мобильном меню, модальном окне и на первом экране; внешний вид
 * задаётся пропом `variant`.
 *
 * @component
 * @param {Object}   props
 * @param {('pill'|'block'|'outline')} [props.variant='pill'] - Вариант оформления:
 *   «пилюля» (шапка), блок (модалка, мобильное меню) или контур — вторичная
 *   кнопка рядом с главной (первый экран на телефоне)
 * @param {string}   [props.label]     - Текст кнопки; по умолчанию ключ `modal.cta`
 * @param {Function} [props.onClick]   - Доп. колбэк перед переходом (например, закрытие модалки)
 * @param {string}   [props.className=''] - Дополнительные CSS-классы
 * @param {string}   [props.testId]    - data-testid для тестов
 * @returns {JSX.Element}
 *
 * @example
 * <CtaButton variant="pill" />
 * <CtaButton variant="block" onClick={handleClose} />
 * <CtaButton variant="outline" className="hero__secondary-cta" />
 */
const CtaButton = ({
  variant = 'pill',
  label,
  onClick,
  className = '',
  testId,
}) => {
  const { t } = useTranslation();
  const goToContacts = useGoToContacts();

  // Сначала внешний колбэк (закрытие модалки или меню), затем переход к
  // контактам — хук откладывает его на следующий кадр.
  const handleClick = useCallback(() => {
    onClick?.();
    goToContacts();
  }, [onClick, goToContacts]);

  const classes = ['cta-button', `cta-button--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      type="button"
      onClick={handleClick}
      data-testid={testId}
    >
      <span>{label ?? t('modal.cta')}</span>
      <span className="cta-button__arrow" aria-hidden="true">
        →
      </span>
    </button>
  );
};

export default memo(CtaButton);
