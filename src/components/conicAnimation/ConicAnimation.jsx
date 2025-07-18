import './style.css';

const ConicAnimation = ({ children, ...props }) => {
  return (
    <div class="conic" {...props}>
      {children}
    </div>
  );
};

export default ConicAnimation;