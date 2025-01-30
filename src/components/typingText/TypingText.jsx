import { useState, useEffect, useRef } from 'react';
import "./style.css";

const TypingText = ({ className, text }) => {
    const [currentText, setCurrentText] = useState('');
    const intervalRef = useRef(null);

    useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentText(prevText => prevText + text[currentText.length]);
      if (currentText.length >= text.length) clearInterval(intervalRef.current);
    }, 100);

        return () => clearInterval(intervalRef.current);
    }, [text, currentText.length]);

  return (
    <strong className={className}>{text}</strong>
  )
}

export default TypingText;