import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import App from "./App";
import { store } from './srore/store';
// import { sumTwo } from './utils/helperFunctions';
import "swiper/css";
import "swiper/css/bundle";

// console.log(sumTwo([2, 7, 11, 15], 6));

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
