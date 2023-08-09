import { createPortal } from "react-dom";

const Modal = ({ open, children }) => {
  if (!open) return null;

  return createPortal(
    <div className="modal">
      <h2>My awesome modal</h2>
      {children}
    </div>,
    document.getElementById('portal')
  )
}

export default Modal;