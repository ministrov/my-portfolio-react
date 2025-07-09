import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './Layout';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import HomePage from './pages/HomePage';

import './styles/main.css';

const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const PageNotFound = lazy(() => import('./pages/pageNotFound/PageNotFound'));

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n?.isInitialized) {
      document.documentElement.lang = i18n.language;
    }
  }, [i18n?.isInitialized, i18n.language]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/projects"
              element={<ProjectsPage />}
            />
            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
