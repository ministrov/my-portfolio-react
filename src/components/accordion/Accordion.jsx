import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import { faqs } from '../../const';
import AccordionItem from '../accordionItem/AccordionItem';
import './style.css';

/**
 * Варианты анимации для контейнера списка.
 * Определяет staggered анимацию для дочерних элементов.
 * @type {import('framer-motion').Variants}
 */
const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/**
 * Компонент аккордеона для отображения списка вопросов и ответов (FAQ).
 * Поддерживает анимации с помощью Framer Motion, пошаговое появление элементов
 * и возможность открытия только одного элемента одновременно.
 *
 * @component
 * @example
 * return (
 *   <Accordion />
 * )
 *
 * @returns {JSX.Element} Разметка аккордеона
 */
const Accordion = () => {
  const { t } = useTranslation();
  // Индекс активного элемента (null означает, что ни один не открыт)
  const [activeIndex, setActiveIndex] = useState(null);

  /**
   * Переключает состояние элемента аккордеона.
   * Если переданный id уже активен, закрывает элемент (устанавливает null),
   * иначе открывает элемент с этим id.
   *
   * @param {number} id - Идентификатор элемента FAQ
   */
  const toggleItem = useCallback((id) => {
    setActiveIndex((prevIndex) => (prevIndex === id ? null : id));
  }, []);

  // Если массив вопросов пуст, отображаем сообщение
  if (!faqs || faqs.length === 0) {
    return (
      <div className="faq__list faq__list--empty">
        <p>{t('faqs.emptyMessage')}</p>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.ul
        className="faq__list"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        aria-label={t('faqs.listAriaLabel')}
      >
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            item={faq}
            onClick={toggleItem}
            isActive={activeIndex === faq.id}
          />
        ))}
      </m.ul>
    </LazyMotion>
  );
};

export default Accordion;
