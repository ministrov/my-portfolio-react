import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Up from './components/Up/Up';
import Footer from './components/footer/Footer';

const Layout = () => {
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
