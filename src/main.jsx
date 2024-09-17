import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./components/Login/Login.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    //<StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    //</StrictMode>
);
