import { useState, useEffect, useLayoutEffect } from 'react';
import Tooltip from '../tooltip/Tooltip';
import './style.css';

export function MyComponent({ text }) {
  const [show, setShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Hover me
        </button>
        <Tooltip text="Это всплывающая подсказка!" visible={isHovered} />
      </div>
    </div>
  );
}