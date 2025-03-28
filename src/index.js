import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import App from "./App";
import { store } from './store/store';
import "swiper/css";
import "swiper/css/bundle";
import "./utils/i18n/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
