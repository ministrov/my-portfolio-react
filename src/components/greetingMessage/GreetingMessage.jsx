import './style.css';

/**
 * Пример простого компонента-сообщения.
 * Рендерит абзац с приветственным текстом.
 *
 * @component
 * @returns {JSX.Element} Абзац с текстом приветствия.
 *
 * @example
 * // Использование в компоненте
 * <GreetingMessage />
 */
const GreetingMessage = () => {
  return (
    <p className="greeting-message">
      Привет! Это пример компонента в проекте портфолио.
    </p>
  );
};

export default GreetingMessage;
