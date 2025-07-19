// import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

        ))} */}


        <Accordion>

        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
