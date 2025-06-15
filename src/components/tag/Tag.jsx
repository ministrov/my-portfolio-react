import './style.css';

const Tag = ({ children, color = 'purple', ...props }) => {
  return (
    <div className={`tag ${color === 'red' ? 'red' : 'purple'}`} {...props}>
      {children}
    </div>
  );
};

export default Tag;
