// import { createPortal } from "react-dom";
import './style.css';

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;

  return (
    <>
      <div className="overlay" style={OVERLAY_STYLES}></div>
      <div className="modal">
        <button className="modal__close" onClick={onClose}>X</button>
        {children}
      </div>
    </>
  )
}

export default Modal;