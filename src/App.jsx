import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import Page404 from "./pages/Page404";
// import Header from "./components/header/Header";
// import Footer from "./components/footer/Footer";
import "./styles/main.css";
// import ScrollToTop from './components/scrollToTop/ScrollToTop';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes >
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      {/* <Header />
      <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
