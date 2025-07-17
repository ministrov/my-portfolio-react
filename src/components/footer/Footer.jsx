import { useTranslation } from 'react-i18next';
import Logo from '../logo/Logo';
import SocialList from '../socials/SocialList';
import './style.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="main-footer">
      <div className="main-footer__upper">
        <div className="main-footer__row main-footer__row-2">
          <Logo className={'logo__link--second'} color='#ffffff' />
          <p className="main-footer__short-desc">{t('footer.description')}</p>
        </div>
        <div className="main-footer__row main-footer__row-1">
          <SocialList className={'main-footer__list'} />
        </div>
      </div>

      <div className="main-footer__lower">
        &copy; {t('footer.copyright')}
        <a rel="noreferrer" target="_blank" href="#!">
          {t('footer.author')}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
