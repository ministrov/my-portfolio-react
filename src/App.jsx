import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MotionConfig } from 'motion/react';
import { LanguageProvider } from './context/LanguageProvider';
import HomePage from './pages/HomePage';
import Layout from './layouts/Layout';
import Loader from './components/loader/Loader';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

import './styles/main.css';
import 'swiper/css';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const PageNotFound = lazy(() => import('./pages/pageNotFound/PageNotFound'));

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <LanguageProvider>
          {/* Граница каркаса: ловит сбой в шапке, подвале и самом Layout.
              Сбой страницы ловит своя граница внутри Layout — там шапка и
              подвал остаются на месте. */}
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              {/* Маршруты продублированы в public/.htaccess: сервер отдаёт по
                  ним index.html со статусом 200, остальным адресам — 404.
                  Новую страницу добавлять в оба места. */}
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="*" element={<PageNotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </LanguageProvider>
      </BrowserRouter>
    </MotionConfig>
  );
};

export default App;
