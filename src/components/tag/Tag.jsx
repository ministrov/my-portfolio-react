import { forwardRef } from 'react';
import './style.css';

const Tag = forwardRef(({ children, color = null, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={`tag ${color === 'red' ? 'red' : 'purple'}`}
      {...props}
    >
      {children}
    </li>
  );
});

Tag.displayName = 'Tag';

export default Tag;
