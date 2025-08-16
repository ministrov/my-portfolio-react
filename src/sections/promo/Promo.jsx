import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import Button from '../../components/button/Button';
import SocialList from '../../components/socials/SocialList';
import MouseScroll from '../../components/mouseScroll/MouseScroll';
import TypingEffect from '../../components/typingEffect/TypingEffect';
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
          <div
            className="promo__text"
            key="promo-text"
          >
            {lang === 'ru' && (
              <motion.strong
                className={'promo__greeting'}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
                exit={{ opacity: 0, y: 0 }}
              >
                Привет, Я{<br />} <TypingEffect text={'Антон Жилин'} speed={300} />.
              </motion.strong>
            )}
            {lang === 'en' && (
              <motion.strong
                className={'promo__greeting'}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
                exit={{ opacity: 0, y: 0 }}
              >
                Hi, I&apos;m{<br />} <TypingEffect text={"Anton Zhilin"} speed={300} />.
              </motion.strong>
            )}

            <motion.p
              className="promo__slogan"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{ delay: 0.5, duration: 0.5, ease: 'easeInOut' }}
              exit={{ opacity: 0, y: 0 }}
            >
              {t('promo.promoSlogan')}
            </motion.p>

            <motion.div className="promo__btns"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{ delay: 0.7, duration: 0.5, ease: 'easeInOut' }}
              exit={{ opacity: 0, y: 0 }}
            >
              <Button
                className={'promo__btn'}
                href={cvPdf}
                download={cvPdf}
                icon={<BsBoxArrowInUpRight width={20} height={20} />}
              >
                {t('promo.promoBtn')}
              </Button>

              <SocialList variant='blue' />
            </motion.div>
          </div>

          <motion.div
            key="promo-image"
            className="promo__image"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
            exit={{ opacity: 0, y: 0 }}
          >
            <img
              className="promo__avatar"
              src={avatar}
              srcSet={`${avatar} 1x, ${avatar2x} 2x, ${avatar3x} 3x`}
              sizes="(max-width: 600px) 300px, (max-width: 1024px) 400px, 500px"
              width="500"
              height="500"
              alt={'Avatar a pixel man with a a laptop'}
              fetchpriority='high'
              decoding='async'
            />
          </motion.div>
        </div>
      </div>
      <MouseScroll />
    </section>
  );
};

export default Promo;
