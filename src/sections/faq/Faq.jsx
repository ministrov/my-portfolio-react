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
      question: t('faqs.question_1.name'),
      answer: t('faqs.question_1.answer'),
    },
    {
      question: t('faqs.question_2.name'),
      answer: t('faqs.question_2.answer'),
    },
    {
      question: t('faqs.question_3.name'),
      answer: t('faqs.question_3.answer'),
    },
    {
      question: t('faqs.question_4.name'),
      answer: t('faqs.question_4.answer'),
    },
    {
      question: t('faqs.question_5.name'),
      answer: t('faqs.question_5.answer'),
    },
    {
      question: t('faqs.question_6.name'),
      answer: t('faqs.question_6.answer'),
    },
    {
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
              key={index}
            >
              <motion.div
                className="faq__question"
                onClick={() => toggleFAQ(index)}
                // whileHover={{ scale: 1.02 }}
                // whileTap={{ scale: 0.98 }}
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
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: 1,
                      height: 'auto',
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    <motion.p
                      className="faq__muted"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {item.answer}
                    </motion.p>
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
