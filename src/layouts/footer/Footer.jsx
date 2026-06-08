import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import Logo from '../../components/logo/Logo';
import SocialList from '../../components/socials/SocialList';
import './style.css';

/**
 * Компонент футера сайта.
 * Отображает логотип, краткое описание, список социальных сетей и копирайт.
 * Использует локализацию через react-i18next.
 *
 * @component
 * @example
 * return <Footer />
 */
const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="main-footer">
      <div className="main-footer__upper">
        <div className="main-footer__row main-footer__row-2">
          <Logo variant="white" />
          <p className="main-footer__short-desc">{t('footer.description')}</p>
        </div>
        <div className="main-footer__row main-footer__row-1">
          <SocialList className={'main-footer__list'} />
        </div>
      </div>

      <div className="main-footer__lower">
        &copy; {t('footer.copyright')}
        <a
          rel="noreferrer"
          target="_blank"
          href="#!"
          aria-label={t('footer.author')}
        >
          {t('footer.author')}
        </a>
      </div>
    </footer>
  );
};

export default memo(Footer);
