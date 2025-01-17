import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaLongArrowAltUp } from "react-icons/fa";
import './style.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return (
    <div className="scroll-to" onClick={scrollToTop}>
      <FaLongArrowAltUp />
    </div>
  )
}

export default ScrollToTop;