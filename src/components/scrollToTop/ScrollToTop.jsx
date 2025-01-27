import { useEffect, useState } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
import './style.css';

const ScrollToTop = () => {
  const [isShowed, setIsShowed] = useState(false);

  const scrollToTop = () => {
    // console.log(isShowed);
    // window.scrollTo(0, 0);
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY >= 345) {
        setIsShowed(true);
      } else {
        setIsShowed(false);
      }
    });

    scrollToTop(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div 
      className={`scroll-to ${isShowed ? 'scroll-to--showed' : ''}`} 
      onClick={scrollToTop}
    >
      <FaLongArrowAltUp />
    </div>
  )
}

export default ScrollToTop;