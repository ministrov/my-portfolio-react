import React, { useState } from "react";
import logo from "./logo.png";
import "./style.css";

const SidebarToggler = ({ toggleSidebar, isExpanded }) => {
  return (
    <button className="sidebar__toggle-btn toggle-btn" onClick={toggleSidebar}>
      <span className="visually-hidden">
        {isExpanded ? "Collapse" : "Expand"}
      </span>
    </button>
  );
};

const CollapsingSidebar = ({ routes, settings }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(current => !current);
  };

  return (
    <aside className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <nav className="sidebar__header">
        <div className="sidebar__logo logo">
          <img
            className="logo__image"
            src={logo}
            width="56"
            height="56"
            alt="logo"
          />

          <span className="logo__text">Technifly</span>

          <SidebarToggler
            toggleSidebar={toggleSidebar}
            isExpanded={isExpanded}
          />
        </div>

        <div className="sidebar__content">
          <ul className="sidebar-menu">
            {routes.map((route) => {
              return (
                <li className="sidebar-menu__item" key={route.id}>
                  <a className="sidebar-menu__link" href={route.path}>
                    <div className="sidebar-menu__icon"></div>
                    <span className="sidebar-menu__title">{route.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <ul className="sidebar-menu">
            {settings.map((set) => {
              return (
                <li className="sidebar-menu__item" key={set.id}>
                  <a className="sidebar-menu__link" href={set.path}>
                    <div className="sidebar-menu__icon"></div>
                    <span className="sidebar-menu__title">{set.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="sidebar-user">
        <div className="sidebar-user__image"></div>
        <div className="sidebar-user__info">
          <h3>User Account</h3>
          <span>Mark T.</span>
        </div>
      </div>
    </aside>
  );
};

export default CollapsingSidebar;
