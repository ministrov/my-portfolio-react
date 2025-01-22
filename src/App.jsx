// import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AnimatedRoutes from "./pages/AnimatedRoutes";
import "./styles/main.css";

// console.log(React);

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
