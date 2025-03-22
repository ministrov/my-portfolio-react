import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Button from "../button/Button";
import Backdrop from "../backdrop/Backdrop";
import "./style.css";
import SocialList from '../socials/SocialList';

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
          <h2>Reach out to me in any socials</h2>
          <p>Facing difficulties? Remember that I'm always available to offer guidance and assistance. No matter how big or small your problem may seem, I’m here to provide support. Reach out today, and let's tackle it together.</p>
          <div className="modal__socials">
            <SocialList/>
          </div>
          <Button
            onClick={onClose}
            text={"Close"}
            className={"modal__btn btn--theme"}
          />
        </div>
      </motion.div>
    </Backdrop>,
    document.getElementById("portal")
  );
};

export default Modal;
