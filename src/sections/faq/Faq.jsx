import { useState } from "react";
import Heading from "../../components/heading/Heading";
import { FaPlus } from "react-icons/fa6";
import { faqs } from "../../data/faq";
import "./style.css";

const Faq = () => {
  const [ activeIndex, setActiveIndex ] = useState(-1);
  return (
    <section className="faq">
      <div className="container">
        <Heading 
          title={"Frequantly Asked Questions"} 
          slogan={"Lorem ipsum dolor sit amet consectetur, adipisicing elit."}
          className='heading-sec__main--second'
        />
        <div className="faq__list">
          {
            faqs.map((item, index) => (
              <div className={`faq__item ${activeIndex === index ? 'faq__item--active' : ''}`}
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
                  {
                    activeIndex === index ?
                      <div className="faq__icon">
                        <FaPlus />
                      </div> 
                    :
                      <div className="faq__icon faq__icon--cross">
                        <FaPlus/>
                      </div>
                  }
                </div>
                <div className="faq__answer">
                  <p className="faq__muted">{item.description}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Faq