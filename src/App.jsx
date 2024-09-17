import { useState } from "react";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./components/Home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/home/*"
                element={<PrivateRoute element={<Home />} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default App;
