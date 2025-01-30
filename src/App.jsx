import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AnimatedRoutes from "./pages/AnimatedRoutes";
import { sumTwo } from './utils/helperFunctions';
import "./styles/main.css";

console.log(sumTwo([2, 7, 11, 15]));

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
