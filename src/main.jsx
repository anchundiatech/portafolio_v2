import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./App.css";

// Lazy load i18n to reduce critical path
import("./i18n").catch((err) => console.error("Error loading i18n:", err));

ReactDOM.createRoot(document.getElementById("root")).render(
  // Note: StrictMode disabled in production to avoid double renders causing reflows
  // In development, use: <React.StrictMode>.....</React.StrictMode> for stricter checks
  <Router>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Router>
);
