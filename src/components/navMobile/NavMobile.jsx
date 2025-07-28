import { useState, useRef, useEffect } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ToggleLang from "../toggleLang/ToggleLang";
import { routes } from "../../const";
import './style.css';

const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <div className="nav-mobile" ref={ref}>
      <div className="nav-mobile__buttons">
        <div className="nav-mobile__lang">
          <ToggleLang className="nav-mobile__lang" />
        </div>
        <div className="nav-mobile__hamburger">
          <Hamburger toggled={isOpen} size={30} toggle={setOpen} color="#ffffff" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="nav-mobile__wrapper"
          >
            <ul className="nav-mobile__list">
              {routes.map((route, idx) => {
                const { Icon } = route;

                return (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 30,
                      delay: 0.5 + idx / 10,
                    }}
                    key={route.title}
                    className="nav-mobile__item"
                  >
                    <a
                      onClick={() => setOpen((prev) => !prev)}
                      className={
                        "nav-mobile__link"
                      }
                      href={route.href}
                    >
                      <span className="nav-mobile__title">{t(route.title)}</span>
                      <Icon className="nav-mobile__icon" color="#0058a7" />
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavMobile;