import './style.css';

const ModalSteps = () => {
  return (
    <div className="modal__modal-step modal-step modal-step__list">
      <div className="modal-step__item">
        <span className="modal-step__counter">1.</span>
        <p className="modal-step__text">
          Наш консультант <span>уточнит задачи</span> и цели сайта
        </p>
      </div>
      <div className="modal-step__item">
        <span className="modal-step__counter">2.</span>
        <p className="modal-step__text">
          Подготовим <span>предложение и смету</span> под ваш проект
        </p>
      </div>
      <div className="modal-step__item">
        <span className="modal-step__counter">3.</span>
        <p className="modal-step__text">
          Закрепим договорённости и <span>запустим разработку</span>
        </p>
      </div>
      <div className="modal-step__item">
        <span className="modal-step__counter">4.</span>
        <p className="modal-step__text">
          Вы получаете <span>готовый к запуску сайт</span>
        </p>
      </div>
    </div>
  );
};

export default ModalSteps;
