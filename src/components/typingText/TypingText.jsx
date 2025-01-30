import "./style.css";

const TypingText = ({ className, text }) => {
  return (
    <strong className={className}>{text}</strong>
  )
}

export default TypingText;