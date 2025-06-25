import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Heading from '../../components/heading/Heading';
import { FaPlus } from 'react-icons/fa6';
import './style.css';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { t } = useTranslation();

  const faqs = [
    {
      id: 1,
      question: t('faqs.question_1.name'),
      answer: t('faqs.question_1.answer'),
    },
    {
      id: 2,
      question: t('faqs.question_2.name'),
      answer: t('faqs.question_2.answer'),
    },
    {
      id: 3,
      question: t('faqs.question_3.name'),
      answer: t('faqs.question_3.answer'),
    },
    {
      id: 4,
      question: t('faqs.question_4.name'),
      answer: t('faqs.question_4.answer'),
    },
    {
      id: 5,
      question: t('faqs.question_5.name'),
      answer: t('faqs.question_5.answer'),
    },
    {
      id: 6,
      question: t('faqs.question_6.name'),
      answer: t('faqs.question_6.answer'),
    },
    {
      id: 7,
      question: t('faqs.question_7.name'),
      answer: t('faqs.question_7.answer'),
    },
  ];

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="faq">
      <div className="container">
        <Heading
          title={t('heading.faq.name')}
          slogan={t('heading.faq.subheading')}
          className="heading-sec__main--second"
        />
        <ul className="faq__list">
          {faqs.map((item, index) => (
            <li
              className={`faq__item ${
                activeIndex === index ? 'faq__item--active' : ''
              }`}
              key={item.id}
            >
              <motion.div
                className="faq__question"
                onClick={() => toggleFAQ(index)}
              >
                <h3>{item.question}</h3>
                <motion.div
                  className="faq__icon"
                  animate={{
                    rotate: activeIndex === index ? 45 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <FaPlus />
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="faq__answer"
                    initial={{ opacity: 0, height: 0, padding: 0 }}
                    animate={{
                      opacity: 1,
                      height: 'auto',
                      padding: 24
                    }}
                    exit={{ opacity: 0, height: 0, padding: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Faq;
