// import { useState, useEffect, useRef } from "react";
// import { TypeAnimation } from 'react-type-animation';
// import './style.css';

// const TypingEffect = ({ text }) => {
//   // const [displayedText, setDisplayedText] = useState('');
//   // const indexRef = useRef(0);
//   // const textRef = useRef(text);
//   // const speedRef = useRef(speed);

//   // useEffect(() => {
//   //   textRef.current = text;
//   //   speedRef.current = speed;
//   //   indexRef.current = 0;
//   //   setDisplayedText('')
//   // }, [text, speed]);

//   // useEffect(() => {
//   //   if (!text) return;

//   //   const interval = setInterval(() => {
//   //     const currentText = textRef.current;
//   //     const currentIndex = indexRef.current;

//   //     if (currentIndex < currentText.length) {
//   //       setDisplayedText(prev => prev + currentText[currentIndex]);
//   //       indexRef.current += 1;
//   //     } else {
//   //       clearInterval(interval);
//   //     }
//   //   }, speedRef.current);

//   //   return () => clearInterval(interval);
//   // }, [text]);

//   return (
//     <TypeAnimation
//       sequence={[
//         text,
//         1000,
//         'Frontend Developer',
//         1000,
//       ]}
//       speed={50}
//       repeat={Infinity}
//     />
//   )
// }

// export default TypingEffect;