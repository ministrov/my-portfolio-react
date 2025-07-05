import { useState, useEffect, useRef } from "react";
import './style.css';

const TypingEffect = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);
  const textRef = useRef(text);
  const speedRef = useRef(speed);

  // console.log(indexRef);
  // console.log(textRef);
  // console.log(speedRef);

  useEffect(() => {
    textRef.current = text;
    speedRef.current = speed;
    indexRef.current = 0;
    setDisplayedText('')
  }, [text, speed]);

  console.log(displayedText);

  useEffect(() => {
    if (!text) return;

    const interval = setInterval(() => {
      const currentText = textRef.current;
      const currentIndex = indexRef.current;

      if (currentIndex < currentText.length) {
        setDisplayedText(prev => prev + currentText[currentIndex]);
        indexRef.current += 1;
      } else {
        clearInterval(interval);
      }
    }, speedRef.current);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="typewriter-text">{displayedText}</span>
  )
}

export default TypingEffect;