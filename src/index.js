import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import App from "./App";
import "swiper/css";
import "swiper/css/bundle";

// const symbol = Symbol("symbol");
// const symbol1 = Symbol("symbol1 unique one");
// const symbol2 = Symbol("symbol2 unique two");
// const symbol3 = Symbol("symbol3 unique three");

// console.log(symbol);
// console.log(symbol1);
// console.log(symbol2);
// console.log(typeof symbol3);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
