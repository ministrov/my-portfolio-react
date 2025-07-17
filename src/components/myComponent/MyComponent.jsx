import { useState, useEffect, useLayoutEffect } from 'react';
import './style.css';

export function MyComponent({ text }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log('hello from useEffect');
    if (!show) {
      setTimeout(() => {
        setShow(true);
      }, 1000);

      console.log(show);
    }

    return () => {
      console.log(
        'hello from useEffect cleanup function, this will run before the next render'
      );
    }
  });

  useLayoutEffect(() => {
    console.log(
      'hello from useLayoutEffect, this will run after the first render'
    );
  });

  return (
    <div className='my-component'>
      {show && <h1>{text}</h1>}
      {!show || <p>{text}</p>}
    </div>
  );
}