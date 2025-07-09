import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './Layout';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import PageNotFound from './pages/pageNotFound/PageNotFound';
import './styles/main.css';

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n) {
      document.documentElement.lang = i18n.language;
    }
  }, [i18n, i18n?.language]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/projects"
            element={<ProjectsPage/>}
          />
          <Route
            path="*"
            element={<PageNotFound/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
