import { useState } from 'react';
import { Link } from "react-router-dom";
import { BsArrowDownRight } from "react-icons/bs";
import './style.css';

const ServicesListItem = ({ service }) => {
    const [isShort, setIsShort] = useState(false);

    return (
        <li
            className={`services__item ${isShort ? "services__item--long" : ''}`}
        >
            <div className="services__item-block">
                <div className="services__item-text text-outline">{service.num}</div>
                <Link className="services__item-link" href={service.href}>
                <BsArrowDownRight className="services__item-icon"/>
                </Link>
            </div>

            <h2 className="services__subheading">{service.title}</h2>

            <p className={`services__description ${isShort ? 'services__description--long' : ''}`}>{service.description}</p>

            <button className="services__more" onClick={() => setIsShort((current) => !current)}>
                {isShort ? 'Hide all' : 'Show more'}
            </button>

            {/* <div className="services__border"></div> */}
        </li>
  )
}

export default ServicesListItem