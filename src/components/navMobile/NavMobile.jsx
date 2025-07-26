// import { useClickAway } from "react-use";
import { useState, useRef } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import ToggleLang from "../toggleLang/ToggleLang";
// import { AnimatePresence, motion } from "framer-motion";
import { routes } from "../../const";
import './style.css';

const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  console.log(ref);

  return (
    <div className="nav-mobile" ref={ref}>
      <Hamburger toggled={isOpen} size={32} toggle={setOpen} color="#0058a7" />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="nav-mobile__wrapper"
          >
            <ul className="nav-mobile__list">
              {routes.map((route, idx) => {
                const { Icon } = route;

                return (
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + idx / 10,
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
                      <span className="nav-mobile__title">{route.title}</span>
                      <Icon className="nav-mobile__icon" />
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            {isOpen && <ToggleLang className="nav-mobile__lang" />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavMobile;