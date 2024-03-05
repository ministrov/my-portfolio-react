// import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Button from "../button/Button";
import Backdrop from "../backdrop/Backdrop";
import "./style.css";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 1.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;

  return createPortal(
    <Backdrop onClick={onClose}>
      <motion.div
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <Button
          onClick={onClose}
          text={"Close me"}
          className={"modal__btn btn--med btn--theme"}
        />
      </motion.div>
    </Backdrop>,
    document.getElementById("portal")
  );
};

export default Modal;
