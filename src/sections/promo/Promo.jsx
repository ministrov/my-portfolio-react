import { useTranslation } from 'react-i18next';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import Button from '../../components/button/Button';
import SocialList from '../../components/socials/SocialList';
import MouseScroll from '../../components/mouseScroll/MouseScroll';
import TypingEffect from '../../components/typingEffect/TypingEffect';
import { useLanguage } from '../../context/LanguageProvider';
import avatar from '../../assets/png/my-avatar.webp';
import cvPdf from '../../assets/pdfs/my-cv.pdf';
import './style.css';

const Promo = () => {
  const { lang } = useLanguage();
  const { t } = useTranslation();

  return (
    <section className="promo">
      <h2 className="visually-hidden">
        A promo section for introduction of the author
      </h2>
      <div className="container">
        <div className="promo__wrapper">
          <div className="promo__text">
            {lang === 'ru' && (
              <strong className={'promo__greeting'}>
                Привет,{<br />} <TypingEffect text={'Я Антон Жилин'} speed={300} />.
              </strong>
            )}
            {lang === 'en' && (
              <strong className={'promo__greeting'}>
                Hi,{<br />} <TypingEffect text={"I'm Anton Zhilin"} speed={300} />.
              </strong>
            )}

            <p className="promo__slogan">{t('promo.promoSlogan')}</p>
            <p className="promo__welcome">{t('promo.promoText')}</p>
            <div className="promo__btns">
              <Button
                className={'promo__btn'}
                href={cvPdf}
                download={cvPdf}
                icon={<BsBoxArrowInUpRight width={20} height={20} />}
              >
                {t('promo.promoBtn')}
              </Button>

              <SocialList varient='blue' />
            </div>
          </div>

          <div className="promo__image">
            <img
              className="promo__avatar"
              src={avatar}
              width="300"  // Замените на реальную ширину изображения
              height="300"
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
