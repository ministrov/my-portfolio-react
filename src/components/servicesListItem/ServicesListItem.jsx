import { useState } from 'react';
// import { motion } from 'framer-motion';
import { BsArrowDownRight } from "react-icons/bs";
import './style.css';

const ServicesListItem = ({ service }) => {
    const [isShort, setIsShort] = useState(false);

    //  const variants = {
    //     short: { opacity: 1, height: 180 },
    //     long: { opacity: 0, height: 'auto', maxHeight: 'max-content' }
    // };

    return (
        <li
            className={`services__item ${isShort ? "services__item--long" : ''}`}
        >
            <div className="services__item-block">
                <div className="services__item-text text-outline">{service.num}</div>
                <div className="services__arrow" href={service.href}>
                    <BsArrowDownRight className="services__arrow-icon"/>
                </div>
            </div>

            <h2 className="services__subheading">{service.title}</h2>

            <p className={`services__description ${isShort ? 'services__description--long' : ''}`}>{service.description}</p>

            <button className="services__more" onClick={() => setIsShort((current) => !current)}>
                {isShort ? 'Hide' : 'Show more'}
            </button>
        </li>
    )
}

export default ServicesListItem;