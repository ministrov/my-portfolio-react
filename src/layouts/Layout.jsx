import { memo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Up from '../components/Up/Up';
import AnimatedBackground from '../components/animatedBackground/AnimatedBackground';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

/**
 * Граница ошибок страницы — внутри `main`, поэтому при сбое страницы шапка и
 * подвал остаются, и из них можно уйти на другую страницу. `key` с адресом
 * сбрасывает границу при переходе: иначе запасной экран остался бы и на
 * следующей странице. Адрес читается здесь, а не в `Layout`, чтобы переход
 * не перерисовывал шапку, фон и подвал.
 *
 * @component
 * @returns {JSX.Element} Текущая страница под границей ошибок
 */
const PageBoundary = () => {
  const { pathname } = useLocation();

  return (
    <ErrorBoundary key={pathname}>
      <Outlet />
    </ErrorBoundary>
  );
};

/**
 * Основной layout приложения.
 * Содержит единый анимированный фон (звёзды) на все страницы, шапку (Header),
 * основное содержимое (Outlet) под границей ошибок, кнопку "Наверх" (Up) и
 * подвал (Footer). Используется для обёртки всех страниц маршрутизации.
 *
 * Подвал прижат к нижнему краю каркасом `#root` (`styles/main.css`): он
 * рассчитан на то, что `main` и подвал — единственные элементы в потоке,
 * а фон, шапка и «Наверх» спозиционированы как fixed.
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
        <PageBoundary />
      </main>

      <Up />
      <Footer />
    </>
  );
};

export default memo(Layout);
