import { memo } from 'react';
import { Trans } from 'react-i18next';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import './style.css';

/**
 * Объект шага для отображения в компоненте ModalSteps.
 * @typedef {Object} Step
 * @property {string} id - Уникальный идентификатор шага.
 * @property {number} number - Номер шага (отображается в кружке).
 * @property {string} textKey - Ключ перевода для текста шага (используется с Trans).
 */

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
const ModalSteps = ({
  steps,
  testId = 'modal-steps',
  className = '',
}) => {
  // Шаги по умолчанию (4 шага из перевода)
  const defaultSteps = [
    { id: 'step-1', number: 1, textKey: 'modal.items.first' },
    { id: 'step-2', number: 2, textKey: 'modal.items.second' },
    { id: 'step-3', number: 3, textKey: 'modal.items.third' },
    { id: 'step-4', number: 4, textKey: 'modal.items.fourth' },
  ];

  const stepsToRender = steps || defaultSteps;

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

  return (
    <LazyMotion features={domAnimation}>
      <m.ol
        className={`modal__modal-step modal-step modal-step__list ${className}`.trim()}
        data-testid={testId}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label="Шаги процесса разработки сайта"
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
    </LazyMotion>
  );
};

export default memo(ModalSteps);
