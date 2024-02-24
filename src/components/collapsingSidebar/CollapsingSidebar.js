import React, { useState } from "react";
import logo from "./logo.png";
import "./style.css";

const CollapsingSidebar = ({ routes }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar__header">
        <div className="sidebar__logo logo">
          <img
            className="logo__image"
            src={logo}
            width="56"
            height="56"
            alt="logo"
          />

          <span className="logo__text">Technifly</span>
        </div>
        <button className="sidebar__toggle-btn toggle-btn" onClick={toggleSidebar}>
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      <ul className="sidebar-menu">
        {routes.map((route) => {
          return (
            <li className="sidebar-menu__item" key={route.id}>
              <a className="sidebar-menu__link" href={route.path}>
                {route.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CollapsingSidebar;
