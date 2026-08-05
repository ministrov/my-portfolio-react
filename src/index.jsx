import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './utils/i18n/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
