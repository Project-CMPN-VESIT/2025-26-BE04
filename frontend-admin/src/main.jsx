import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./variables.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminProvider from "./context/AdminContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AdminProvider>
  </BrowserRouter>
);
