import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import { store } from "./store";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("learn2"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

