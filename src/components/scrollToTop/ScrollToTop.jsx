import { useEffect, useState } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
import './style.css';

const ScrollToTop = () => {
  const [isShowed, setIsShowed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (window.scrollY >= 345) {
      setIsShowed(true);
    } else {
      setIsShowed(false);
    }

    scrollToTop(); 
  }, []);

  return (
    <div className={`scroll-to ${isShowed ? 'scroll-to-showed' : ''}`} onClick={scrollToTop}>
      <FaLongArrowAltUp />
    </div>
  )
}

export default ScrollToTop;