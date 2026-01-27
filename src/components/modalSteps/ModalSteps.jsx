import './style.css';

const ModalSteps = () => {
  return (
    <div className="modal__modal-step modal-step">
      <div className="modal-step">
        <span className="modal-step__counter">1.</span>
        <p className="modal-step__text">
          Наш консультат <span>подберёт</span> оптимальный вариант
        </p>
      </div>
      <div className="modal-step">
        <span className="modal-step__counter">2.</span>
        <p className="modal-step__text">
          Наш замерщик <span>бесплатно</span> приедет в удобное время
        </p>
      </div>
      <div className="modal-step">
        <span className="modal-step__counter">3.</span>
        <p className="modal-step__text">
          Мы устанавливаем <span>систему фильтрации</span> "Под ключ"
        </p>
      </div>
      <div className="modal-step">
        <span className="modal-step__counter">4.</span>
        <p className="modal-step__text">
          У Вас постоянный источник <span>чистейшей воде</span>
        </p>
      </div>
    </div>
  );
};

export default ModalSteps;
