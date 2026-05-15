import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Up from '../components/Up/Up';

/**
 * Основной layout приложения.
 * Содержит шапку (Header), основное содержимое (Outlet), кнопку "Наверх" (Up) и подвал (Footer).
 * Используется для обёртки всех страниц маршрутизации.
 *
 * @component
 * @example
 * return <Layout />
 */
const Layout = () => {
  return (
    <>
      <Header />

      <main id="main-content">
        <Outlet />
      </main>

      <Up />
      <Footer />
    </>
  );
};

export default memo(Layout);
