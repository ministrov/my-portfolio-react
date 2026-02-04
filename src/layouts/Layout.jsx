import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Up from '../components/Up/Up';

const Layout = () => {
  return (
    // <div className="layout-wrapper">

    // </div>
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
