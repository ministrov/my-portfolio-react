import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import './style.css';

/** Шаги процесса разработки по умолчанию (ключи из i18n). */
const DEFAULT_STEPS = [
  {
    id: 'step-1',
    num: '01',
    titleKey: 'modal.items.first.title',
    descKey: 'modal.items.first.text',
  },
  {
    id: 'step-2',
    num: '02',
    titleKey: 'modal.items.second.title',
    descKey: 'modal.items.second.text',
  },
  {
    id: 'step-3',
    num: '03',
    titleKey: 'modal.items.third.title',
    descKey: 'modal.items.third.text',
  },
  {
    id: 'step-4',
    num: '04',
    titleKey: 'modal.items.fourth.title',
    descKey: 'modal.items.fourth.text',
  },
];

/** Анимация контейнера — дочерние шаги появляются каскадом. */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/** Анимация отдельного шага — появление снизу. */
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

/**
 * Компонент вертикального таймлайна шагов процесса работы.
 *
 * @component
 * @param {Object}   props
 * @param {Array}    [props.steps]    - Шаги; если не указаны — DEFAULT_STEPS
 * @param {string}   [props.testId]   - data-testid для корневого элемента
 * @param {string}   [props.className] - Дополнительные CSS-классы
 * @returns {JSX.Element}
 *
 * @example
 * <ModalSteps />
 */
const ModalSteps = ({ steps, testId = 'modal-steps', className = '' }) => {
  const { t } = useTranslation();
  const stepsToRender = steps ?? DEFAULT_STEPS;

  return (
    <LazyMotion features={domAnimation}>
      <m.ol
        className={['modal-steps', className].filter(Boolean).join(' ')}
        data-testid={testId}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label={t('modal.stepsAriaLabel')}
      >
        {stepsToRender.map((step) => (
          <m.li key={step.id} className="modal-step" variants={itemVariants}>
            <span className="modal-step__num" aria-hidden="true">
              {step.num}
            </span>
            <div className="modal-step__body">
              <p className="modal-step__title">{t(step.titleKey)}</p>
              <p className="modal-step__desc">{t(step.descKey)}</p>
            </div>
          </m.li>
        ))}
      </m.ol>
    </LazyMotion>
  );
};

ModalSteps.propTypes = {
  /** Массив шагов для отображения */
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      num: PropTypes.string.isRequired,
      titleKey: PropTypes.string.isRequired,
      descKey: PropTypes.string.isRequired,
    })
  ),
  /** data-testid */
  testId: PropTypes.string,
  /** Дополнительные CSS-классы */
  className: PropTypes.string,
};

export default memo(ModalSteps);
