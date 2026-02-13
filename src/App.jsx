import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageProvider } from './context/LanguageProvider';
import HomePage from './pages/HomePage';
// import AboutPage from './pages/AboutPage';
import Layout from './layouts/Layout';
import ScrollToTop from './components/scrollToTop/ScrollToTop';

import './styles/main.css';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const PageNotFound = lazy(() => import('./pages/pageNotFound/PageNotFound'));

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageProvider>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
