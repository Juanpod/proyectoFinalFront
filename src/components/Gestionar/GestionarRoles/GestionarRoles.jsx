import { useEffect, useState } from "react";
import { verificarSesion } from "../../verificarSesion/verificarSesion";
import { Routes, Route, useNavigate } from "react-router-dom";
import CrearRol from "./CrearRol";
import ActualizarRol from "./ActualizarRol";
import ListadoRoles from "./ListadoRoles";

const GestionarRoles = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Se monta Gestion de Roles");
        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<ListadoRoles />} />
            <Route path="actualizar/:idRol" element={<ActualizarRol />} />
            <Route path="crear" element={<CrearRol />} />
        </Routes>
    );
};

export default GestionarRoles;
