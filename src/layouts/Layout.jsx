import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './header/Header';
import Footer from './footer/Footer';
import Up from '../components/Up/Up';

const Layout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('lang', i18n.language);
    setSearchParams(newParams);
  }, [i18n.language, searchParams, setSearchParams]);
  return (
    <div className="layout-wrapper">
      <Header />

      <main>
        <Outlet />
      </main>

      <Up />
      <Footer />
    </div>
  );
};

export default Layout;
