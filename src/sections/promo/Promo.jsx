import { useTranslation } from 'react-i18next';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import Button from '../../components/button/Button';
import SocialList from '../../components/socials/SocialList';
import MouseScroll from '../../components/mouseScroll/MouseScroll';
import avatar from '../../assets/png/my-avatar.webp';
import cvPdf from '../../assets/pdfs/my-cv.pdf';
import './style.css';

const Promo = () => {
  const { t } = useTranslation();
  return (
    <section className="promo">
      <h2 className="visually-hidden">
        A promo section for introduction of the author
      </h2>
      <div className="container">
        <div className="promo__wrapper">
          <div className="promo__text">
            <strong className={'promo__greeting'}>
              Привет,{<br/>} Я Антон Жилин.
            </strong>
            <p className="promo__slogan">{t('promo.promoSlogan')}</p>
            <p className="promo__welcome">{t('promo.promoText')}</p>
            <div className="promo__btns">
              <Button
                text={t('promo.promoBtn')}
                href={cvPdf}
                download={cvPdf}
                icon={<BsBoxArrowInUpRight width={20} height={20} />}
              />

              <div className="promo__socials">
                <SocialList className={'socials__list'} />
              </div>
            </div>
          </div>

          <div className="promo__image">
            <img
              className="promo__avatar"
              src={avatar}
              width={252}
              height={252}
              alt={'A funny pixel men with a laptop in his hands'}
            />
          </div>
        </div>
      </div>
      <MouseScroll />
    </section>
  );
};

export default Promo;
