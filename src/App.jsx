import { BrowserRouter as Router } from "react-router-dom";

import { debounce, onResize } from './utils/helperFunctions';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AnimatedRoutes from "./pages/AnimatedRoutes";
import "./styles/main.css";

const debounceResize = debounce(onResize, 500);

debounceResize();
debounceResize();

const App = () => {
  return (
    <Router>
      <Header />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
};

export default App;
