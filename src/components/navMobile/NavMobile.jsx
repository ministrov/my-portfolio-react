// import { useClickAway } from "react-use";
import { useState, useRef } from "react";
import { Squash as Hamburger } from "hamburger-react";
// import { AnimatePresence, motion } from "framer-motion";
// import { routes } from "../../const";

export const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  console.log(ref);

  return (
    <div className="lg:hidden " ref={ref}>
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
    </div>
  );
};