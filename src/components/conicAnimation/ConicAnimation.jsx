import './style.css';

const ConicAnimation = ({ children, ...props }) => {
  return (
    <div className="conic" {...props}>
      {children}
    </div>
  );
};

export default ConicAnimation;