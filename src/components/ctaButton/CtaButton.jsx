import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Переиспользуемая CTA-кнопка «Обсудить проект».
 * Прокручивает страницу к секции контактов (`.contact`). Используется в шапке
 * и в модальном окне; внешний вид задаётся пропом `variant`.
 *
 * @component
 * @param {Object}   props
 * @param {('pill'|'block')} [props.variant='pill'] - Вариант оформления: «пилюля» (шапка) или блок (модалка)
 * @param {string}   [props.label]     - Текст кнопки; по умолчанию ключ `modal.cta`
 * @param {Function} [props.onClick]   - Доп. колбэк перед скроллом (например, закрытие модалки)
 * @param {string}   [props.className=''] - Дополнительные CSS-классы
 * @param {string}   [props.testId]    - data-testid для тестов
 * @returns {JSX.Element}
 *
 * @example
 * <CtaButton variant="pill" />
 * <CtaButton variant="block" onClick={handleClose} />
 */
const CtaButton = ({
  variant = 'pill',
  label,
  onClick,
  className = '',
  testId,
}) => {
  const { t } = useTranslation();

  // Сначала выполняем внешний колбэк (закрытие модалки), затем плавно
  // прокручиваем к контактам в следующем кадре — после возможного размонтирования.
  const handleClick = useCallback(() => {
    onClick?.();
    requestAnimationFrame(() => {
      document
        .querySelector('.contact')
        ?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [onClick]);

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

CtaButton.propTypes = {
  /** Вариант оформления */
  variant: PropTypes.oneOf(['pill', 'block']),
  /** Текст кнопки; по умолчанию ключ `modal.cta` */
  label: PropTypes.string,
  /** Доп. колбэк перед скроллом */
  onClick: PropTypes.func,
  /** Дополнительные CSS-классы */
  className: PropTypes.string,
  /** data-testid */
  testId: PropTypes.string,
};

export default memo(CtaButton);
