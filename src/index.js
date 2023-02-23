import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import AuthComponent, { AuthComponentProvider } from "./store/auth-component";
ReactDOM.render(
  <AuthComponentProvider>
    <App />
  </AuthComponentProvider>,
  document.getElementById("root")
);
