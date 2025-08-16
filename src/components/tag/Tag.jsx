import './style.css';

const Tag = ({ children, color = null, ...props }) => {
  return (
    <div
      className={`tag ${color === 'red' ? 'red' : 'purple'}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Tag;
