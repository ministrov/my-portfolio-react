import { useTranslation } from 'react-i18next';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import Button from '../../components/button/Button';
import SocialList from '../../components/socials/SocialList';
import MouseScroll from '../../components/mouseScroll/MouseScroll';
import TypingEffect from '../../components/typingEffect/TypingEffect';
import FadeIn from '../../components/fadeIn/FadeIn';
import { useLanguage } from '../../context/LanguageProvider';
import avatar from '../../assets/png/my-avatar.webp';
import avatar2x from '../../assets/png/my-avatar-1000.webp';
import avatar3x from '../../assets/png/my-avatar-1500.webp';
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
                Привет, Я{<br />} <TypingEffect text={'Антон Жилин'} speed={300} />.
              </strong>
            )}
            {lang === 'en' && (
              <strong className={'promo__greeting'}>
                Hi, I'm{<br />} <TypingEffect text={"Anton Zhilin"} speed={300} />.
              </strong>
            )}

            <p className="promo__slogan">{t('promo.promoSlogan')}</p>

            <div className="promo__btns">
              <Button
                className={'promo__btn'}
                href={cvPdf}
                download={cvPdf}
                icon={<BsBoxArrowInUpRight width={20} height={20} />}
              >
                {t('promo.promoBtn')}
              </Button>

              <SocialList variant='blue' />
            </div>
          </div>

          <FadeIn>
            <div className="promo__image">
              <img
                className="promo__avatar"
                src={avatar}
                srcSet={`${avatar} 1x, ${avatar2x} 2x, ${avatar3x} 3x`}
                sizes="(max-width: 600px) 300px, (max-width: 1024px) 400px, 500px"
                width="500"
                height="500"
                alt={'A funny pixel men with a laptop in his hands'}
                fetchpriority='high'
                decoding='async'
              />
            </div>
          </FadeIn>
        </div>
      </div>
      <MouseScroll />
    </section>
  );
};

export default Promo;
