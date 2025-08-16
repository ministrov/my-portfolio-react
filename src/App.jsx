import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Layout from './layouts/Layout';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import HomePage from './pages/HomePage';

import './styles/main.css';

const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const PageNotFound = lazy(() => import('./pages/pageNotFound/PageNotFound'));

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

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
            <Route index element={
              <PageWrapper>
                <HomePage />
              </PageWrapper>
            } />
            <Route
              path="/projects"
              element={
                <PageWrapper>
                  <ProjectsPage />
                </PageWrapper>
              }
            />
            <Route
              path="*"
              element={
                <PageWrapper>
                  <PageNotFound />
                </PageWrapper>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
