import { Outlet } from 'react-router-dom';
import Header from "./components/header/Header";
import ScrollUp from './components/scrollUp/scrollUp';
import Footer from "./components/footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet/>
      </main>

      <ScrollUp/>
      <Footer />
    </>
  )
}

export default Layout;