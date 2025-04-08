import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
              onClick={() => {
                if (activeIndex === index) {
                  return setActiveIndex(-1);
                }
                setActiveIndex(index);
              }}
            >
              <div className="faq__question">
                <h3>{item.question}</h3>
                {activeIndex === index ? (
                  <div className="faq__icon">
                    <FaPlus />
                  </div>
                ) : (
                  <div className="faq__icon faq__icon--cross">
                    <FaPlus />
                  </div>
                )}
              </div>
              <div className="faq__answer">
                <p className="faq__muted">{item.answer}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Faq;
