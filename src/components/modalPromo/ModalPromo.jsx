import fire from '../../assets/svg/fire.svg';
import './style.css';

const ModalPromo = () => {
  return (
    <div className="modal__promo modal-promo">
      <img
        className="modal-promo__icon"
        src={fire}
        width={35}
        height={47}
        alt=""
      />
      Разработка -50%
    </div>
  );
};

export default ModalPromo;
