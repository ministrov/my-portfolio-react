import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import HomePage from "./pages/HomePage";
// import ProjectsPage from "./pages/ProjectsPage";
// import ProjectPage from "./pages/projectPage/ProjectPage";
// import PageNotFound from "./pages/pageNotFound/PageNotFound";
import "./styles/main.css";

const ProjectsPageLazy = lazy(() => import("./pages/ProjectsPage"));
const ProjectPageLazy = lazy(() => import("./pages/projectPage/ProjectPage"));
const PageNotFoundLazy = lazy(() => import("./pages/pageNotFound/PageNotFound"));

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes >
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="/projects" element={<ProjectsPage />} /> */}
          <Route path="/projects" element={<Suspense fallback={<>Loading...</>}><ProjectsPageLazy /></Suspense>} />
          {/* <Route path="/project/:id" element={<ProjectPage />} /> */}
          <Route path="/project/:id" element={<Suspense><ProjectPageLazy /></Suspense>} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
          <Route path="*" element={<Suspense><PageNotFoundLazy /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
