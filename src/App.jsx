import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './Layout';
import Loader from './components/loader/Loader.jsx';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import HomePage from './pages/HomePage';

import './styles/main.css';
const ProjectsPageLazy = lazy(() => import('./pages/ProjectsPage.jsx'));
const ProjectPageLazy = lazy(() => import('./pages/projectPage/ProjectPage.jsx'));
const PageNotFoundLazy = lazy(() =>
  import('./pages/pageNotFound/PageNotFound.jsx')
);


const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/projects"
            element={
              <Suspense fallback={<Loader/>}>
                <ProjectsPageLazy />
              </Suspense>
            }
          />
          <Route
            path="/project/:id"
            element={
              <Suspense fallback={<Loader/>}>
                <ProjectPageLazy />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense>
                <PageNotFoundLazy />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
