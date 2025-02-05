import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
// import { deb } from './utils/helperFunctions';
import App from "./App";
import 'swiper/css';
import "swiper/css/bundle";

// console.log(deb());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
