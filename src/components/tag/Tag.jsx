import './style.css';

const Tag = ({ children, size = null, color = null, ...props }) => {
  console.log(color);
  return (
    <div
      className={`tag ${color === 'red' ? 'red' : 'purple'} ${
        size ? 'tag--big' : ''
      }`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Tag;
