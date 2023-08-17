import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './utils/scrollToTop';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './styles/main.css';
import AnimatedRoutes from './pages/AnimatedRoutes';

const App = () => {

  return (
    <>
      <Router>
        <Header />
        <ScrollToTop />
        <AnimatedRoutes/>
      </Router>
      <Footer />
    </>
  );
}

export default App;
