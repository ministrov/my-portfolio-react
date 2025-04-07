import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Heading from '../../components/heading/Heading';
import { FaPlus } from 'react-icons/fa6';
// import { faqs } from '../../helpers/mocks';
import './style.css';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { t } = useTranslation();

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: `
        I specialize in developing responsive web interfaces, creating user interfaces (UI), integrating with backends, optimizing performance, and ensuring cross-browser compatibility. I can also assist with setting up CI/CD processes and automating project deployments.
      `,
    },
    {
      question: 'Which technologies do you use?',
      answer: `
        In my work, I utilize modern technology stacks such as HTML5, CSS3/SASS, JavaScript (ES6+), TypeScript, React.js, Vue.js, as well as various build tools like Webpack and Git for version control.
      `,
    },
    {
      question: 'How long does it take to develop a project?',
      answer: `
        The timeline depends on the complexity of the task and the scope of work. For smaller projects, it may take several weeks, while larger ones could span over several months. I always strive to provide realistic timelines and keep clients informed about every stage of development.
      `,
    },
    {
      question: 'Do you work remotely?',
      answer: `
        Yes, I primarily work remotely. This allows me to collaborate with clients from all over the world and maintain a flexible working schedule.
      `,
    },
    {
      question: 'Do you provide support after project completion?',
      answer: `
        Absolutely! After completing a project, I offer maintenance and technical support for an agreed-upon period. This includes bug fixes, making changes, and enhancing functionality.
      `,
    },
    {
      question: 'What is your experience level?',
      answer: `
        I have more than X years of frontend development experience. Over this time, I've worked on numerous projects ranging from simple landing pages to complex corporate applications. You can view some of my projects in the 'Portfolio' section.
      `,
    },
    {
      question: 'Can I contact you for consultation?',
      answer: `
        Certainly! Feel free to reach out through the contact form on my website or send an email. I'll be happy to answer any questions and help assess the scope of work for your project.
      `,
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
