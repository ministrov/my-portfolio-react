import { Trans } from 'react-i18next';
import './style.css';

const ModalSteps = () => {
  return (
    <div className="modal__modal-step modal-step modal-step__list">
      <div className="modal-step__item">
        <span className="modal-step__counter">1.</span>
        <p className="modal-step__text">
          <Trans
            i18nKey="modal.items.first"
            components={{ highlighed: <span /> }}
          />
        </p>
      </div>
      <div className="modal-step__item">
        <span className="modal-step__counter">2.</span>
        <p className="modal-step__text">
          <Trans
            i18nKey="modal.items.second"
            components={{ highlighed: <span /> }}
          />
        </p>
      </div>
      <div className="modal-step__item">
        <span className="modal-step__counter">3.</span>
        <p className="modal-step__text">
          <Trans
            i18nKey="modal.items.third"
            components={{ highlighed: <span /> }}
          />
        </p>
      </div>
      <div className="modal-step__item">
        <span className="modal-step__counter">4.</span>
        <p className="modal-step__text">
          <Trans
            i18nKey="modal.items.fourth"
            components={{ highlighed: <span /> }}
          />
        </p>
      </div>
    </div>
  );
};

export default ModalSteps;
