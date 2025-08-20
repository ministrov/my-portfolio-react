import './style.css';

const Tag = ({ children, color = null, ...props }) => {
  return (
    <li
      className={`tag ${color === 'red' ? 'red' : 'purple'}`}
      {...props}
    >
      {children}
    </li>
  );
};

export default Tag;
