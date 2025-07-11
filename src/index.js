import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { LanguageProvider } from './context/LanguageProvider';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/bundle';
import './utils/i18n/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HelmetProvider>
  </StrictMode>
);
