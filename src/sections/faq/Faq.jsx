import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import { FaPlus } from 'react-icons/fa6';
import { faqs } from '../../helpers/mocks';
import './style.css';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { t } = useTranslation();

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
                <h3>{item.title}</h3>
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
                <p className="faq__muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Faq;
