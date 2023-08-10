import './style.css';

const Button = ({ href, onClick }) => {
  
  return (
    <>
      {href ? (
        <a href="#!" className="btn">Download CV</a>
      ) : (
          <button type='button' className="btn" onClick={onClick}>
        Click Me
        </button>
      )}
    </>
  );
}

export default Button;