import './style.css';

const Button = ({ href }) => {
  return (
    <>
      {href ? (
        <a href="#!" className="btn">Download CV</a>
      ) : (
        <button type='button' className="btn" onClick={(e) => console.log(e.target)}>
        Click Me
        </button>
      )}
    </>
  );
}

export default Button;