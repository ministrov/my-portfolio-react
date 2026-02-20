import './style.css';

const Loader = ({ color = 'blue' }) => {
  return (
    <div
      className={`loader loader--${color}`}
      aria-label="Loading"
      role="status"
    >
      <div className="loader__spinner"></div>
    </div>
  );
};

export default Loader;
