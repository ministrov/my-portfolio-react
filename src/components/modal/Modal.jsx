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

const Modal = ({ open, onClose }) => {
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
        <div className="modal__content">
          <h2>Call me if you need help</h2>
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quos, nulla fuga nihil et facilis at libero nam sapiente accusantium ratione modi sequi, exercitationem illo doloremque amet esse. Illum repudiandae aut nihil officia, aspernatur eligendi facere obcaecati tempora minima. Non enim earum voluptatibus asperiores illum!</p>
          <Button
            onClick={onClose}
            text={"Close me"}
            className={"modal__btn btn--theme"}
          />
        </div>
      </motion.div>
    </Backdrop>,
    document.getElementById("portal")
  );
};

export default Modal;
