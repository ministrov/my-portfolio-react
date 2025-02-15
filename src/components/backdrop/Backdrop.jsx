import { motion } from "framer-motion";

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: "flex",
  alignItems: "self-end",
  justifyContent: "flex-end",
  width: "100%",
  height: "100%",
  zIndex: 1000,
  opacity: 1,
};

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      style={OVERLAY_STYLES}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
