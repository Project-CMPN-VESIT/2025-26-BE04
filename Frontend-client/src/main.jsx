import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./variables.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ClientProvider from "./context/ClientContext.jsx";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ClientProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ClientProvider>
  </BrowserRouter>
);
