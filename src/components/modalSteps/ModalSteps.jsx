import { memo } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Объект шага для отображения в компоненте ModalSteps.
 * @typedef {Object} Step
 * @property {string} id - Уникальный идентификатор шага.
 * @property {number} number - Номер шага (отображается в кружке).
 * @property {string} textKey - Ключ перевода для текста шага (используется с Trans).
 */

/** Шаги процесса разработки по умолчанию (4 шага из перевода). */
const DEFAULT_STEPS = [
  { id: 'step-1', number: 1, textKey: 'modal.items.first' },
  { id: 'step-2', number: 2, textKey: 'modal.items.second' },
  { id: 'step-3', number: 3, textKey: 'modal.items.third' },
  { id: 'step-4', number: 4, textKey: 'modal.items.fourth' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/**
 * Компонент для отображения списка шагов процесса разработки в модальном окне.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Step[]} [props.steps] - Массив шагов для отображения. Если не указан, используются шаги по умолчанию из перевода.
 * @param {string} [props.testId] - ID для тестирования.
 * @param {string} [props.className] - Дополнительные CSS-классы.
 * @returns {JSX.Element} Упорядоченный список шагов с анимацией.
 *
 * @example
 * <ModalSteps />
 *
 * @example
 * <ModalSteps steps={[
 *   { id: '1', number: 1, textKey: 'custom.step1' },
 *   { id: '2', number: 2, textKey: 'custom.step2' }
 * ]} />
 */
const ModalSteps = ({ steps, testId = 'modal-steps', className = '' }) => {
  const { t } = useTranslation();
  const stepsToRender = steps ?? DEFAULT_STEPS;

  return (
    <m.ol
      className={['modal-step modal-step__list', className]
        .filter(Boolean)
        .join(' ')}
      data-testid={testId}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={t('modal.stepsAriaLabel')}
    >
      {stepsToRender.map((step) => (
        <m.li
          key={step.id}
          className="modal-step__item"
          variants={itemVariants}
        >
          <span className="modal-step__counter" aria-hidden="true">
            {step.number}.
          </span>
          <p className="modal-step__text">
            <Trans
              i18nKey={step.textKey}
              components={{ highlighed: <span /> }}
            />
          </p>
        </m.li>
      ))}
    </m.ol>
  );
};

ModalSteps.propTypes = {
  /** Массив шагов для отображения */
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      textKey: PropTypes.string.isRequired,
    })
  ),
  /** ID для тестирования */
  testId: PropTypes.string,
  /** Дополнительные CSS-классы */
  className: PropTypes.string,
};

export default memo(ModalSteps);
