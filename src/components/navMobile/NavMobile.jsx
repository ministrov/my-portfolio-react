// import { useClickAway } from "react-use";
import { useState, useRef } from "react";
import { Squash as Hamburger } from "hamburger-react";
import ToggleLang from "../toggleLang/ToggleLang";
// import { AnimatePresence, motion } from "framer-motion";
// import { routes } from "../../const";
import './style.css';

const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  console.log(ref);

  return (
    <div className="nav-mobile" ref={ref}>
      <Hamburger toggled={isOpen} size={32} toggle={setOpen} color="#0058a7" />

      <ToggleLang className="nav-mobile__lang" />
    </div>
  );
};

export default NavMobile;