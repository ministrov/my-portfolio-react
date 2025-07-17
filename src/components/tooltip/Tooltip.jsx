import { useState, useRef, useLayoutEffect } from 'react';

function Tooltip({ text, visible }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    if (!visible || !tooltipRef.current) return;

    const tooltipElement = tooltipRef.current;
    const rect = tooltipElement.getBoundingClientRect();

    const newX = window.innerWidth / 2 - rect.width / 2;
    const newY = window.innerHeight / 2 - rect.height / 2;

    setPosition({
      x: newX,
      y: newY,
    });
  }, [text, visible]);

  if (!visible) return null;

  return (
    <div
      ref={tooltipRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        padding: '8px 16px',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        pointerEvents: 'none'
      }}
    >
      {text}
    </div>
  );
}

export default Tooltip;