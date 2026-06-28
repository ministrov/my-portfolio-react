import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import Logo from '../../components/logo/Logo';
import SocialList from '../../components/socials/SocialList';
import './style.css';

/**
 * Компонент футера сайта.
 * Одна строка из трёх зон: логотип слева, копирайт по центру, соцсети справа.
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
      <div className="main-footer__inner">
        <Logo variant="white" />

        <p className="main-footer__copyright">
          &copy; {t('footer.copyright')}{' '}
          <a
            className="main-footer__author"
            rel="noreferrer"
            target="_blank"
            href="#!"
            aria-label={t('footer.author')}
          >
            {t('footer.author')}
          </a>
        </p>

        <SocialList className="main-footer__list" />
      </div>
    </footer>
  );
};

export default memo(Footer);
