import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Helmet } from 'react-helmet';
import Layout from './Layout';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import Page404 from "./pages/Page404";
import "./styles/main.css";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes >
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
