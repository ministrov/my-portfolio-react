import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import AnimatedBackground from '../components/animatedBackground/AnimatedBackground';
import Footer from './footer/Footer';
import Up from '../components/Up/Up';

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <AnimatedBackground />
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
