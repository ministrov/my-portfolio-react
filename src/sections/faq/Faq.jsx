// import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { motion, AnimatePresence } from 'framer-motion';
import Accordion from '../../components/accordion/Accordion';
import Heading from '../../components/heading/Heading';
// import { FaPlus } from 'react-icons/fa6';
// import { faqs } from './faqs';
import './style.css';

const Faq = () => {
  // const [activeIndex, setActiveIndex] = useState(-1);
  const { t } = useTranslation();

  // const toggleFAQ = (index) => {
  //   if (activeIndex === index) {
  //     setActiveIndex(-1);
  //   } else {
  //     setActiveIndex(index);
  //   }
  // };

  return (
    <section className="faq" aria-labelledby="faq-heading">
      <div className="container">
        <Heading
          title={t('heading.faq.name')}
          slogan={t('heading.faq.subheading')}
          className="heading-sec__main--second"
        />

        {/* {faqs.map((item, index) => (
          <li
            className={`faq__item ${activeIndex === index ? 'faq__item--active' : ''
              }`}
            key={item.id}
          >
            <motion.div
              className="faq__question"
            >
              <h3>{t(item.question)}</h3>

              <motion.button
                onClick={() => toggleFAQ(index)}
                className="faq__icon"
                animate={{
                  rotate: activeIndex === index ? "45deg" : "0deg",
                  transition: { duration: 0.3, ease: "easeInOut" }
                }}
                aria-label={activeIndex === index ? t('faqs.close') : t('faqs.open')}
                aria-expanded={activeIndex === index}
                aria-controls="dropdown-menu"
              >
                <FaPlus />
              </motion.button>
            </motion.div>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  id="dropdown-menu"
                  className="faq__answer"
                  initial={{ opacity: 0, height: 0, padding: 0 }}
                  animate={{
                    opacity: 1,
                    height: 'auto',
                    paddingTop: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 24
                  }}
                  exit={{ opacity: 0, height: 0, padding: 0 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                >
                  {t(item.answer)}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))} */}


        <Accordion/>
      </div>
    </section>
  );
};

export default Faq;
