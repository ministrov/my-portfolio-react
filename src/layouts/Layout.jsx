import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Up from '../components/Up/Up';
import AnimatedBackground from '../components/animatedBackground/AnimatedBackground';

/**
 * Основной layout приложения.
 * Содержит единый анимированный фон (звёзды) на все страницы, шапку (Header),
 * основное содержимое (Outlet), кнопку "Наверх" (Up) и подвал (Footer).
 * Используется для обёртки всех страниц маршрутизации.
 *
 * @component
 * @example
 * return <Layout />
 */
const Layout = () => {
  return (
    <>
      <AnimatedBackground />

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
