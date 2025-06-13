import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/header/Header';
import Up from './components/Up/Up';
import Footer from './components/footer/Footer';

const Layout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('lang', i18n.language);
    setSearchParams(newParams);
  }, [i18n.language, searchParams, setSearchParams]);
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Up />
      <Footer />
    </>
  );
};

export default Layout;
