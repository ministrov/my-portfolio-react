import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './Layout';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ProjectPage from './pages/projectPage/ProjectPage.jsx';
import PageNotFound from './pages/pageNotFound/PageNotFound.jsx';

import './styles/main.css';

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
            element={<ProjectsPage/>}
          />
          <Route
            path="/project/:id"
            element={<ProjectPage/>}
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
