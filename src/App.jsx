import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import HomePage from "./pages/HomePage";
import "./styles/main.css";
// import { useSelector } from 'react-redux';
// import i18n from 'i18next';

const ProjectsPageLazy = lazy(() => import("./pages/ProjectsPage"));
const ProjectPageLazy = lazy(() => import("./pages/projectPage/ProjectPage"));
const PageNotFoundLazy = lazy(() => import("./pages/pageNotFound/PageNotFound"));

const App = () => {
  // const language = useSelector((state) => state.language);

  // useEffect(() => {
  //   i18n.changeLanguage(language);
  // }, [language]);

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes >
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/projects" element={<Suspense fallback={<>Loading...</>}><ProjectsPageLazy /></Suspense>} />
          <Route path="/project/:id" element={<Suspense><ProjectPageLazy /></Suspense>} />
          <Route path="*" element={<Suspense><PageNotFoundLazy /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
