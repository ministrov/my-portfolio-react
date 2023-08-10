// import { createPortal } from "react-dom";
import './style.css';

const Modal = ({ children }) => {

  return (
    <div className="modal">
      {children}
    </div>
  )
}

export default Modal;