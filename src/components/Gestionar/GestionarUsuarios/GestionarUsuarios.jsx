import "../Gestionar.css";
import { useEffect, useState } from "react";
import { verificarSesion } from "../../verificarSesion/verificarSesion";
import { Routes, Route, useNavigate } from "react-router-dom";
import CrearUsuario from "./CrearUsuario";
import ActualizarUsuario from "./ActualizarUsuario";
import ListadoUsuarios from "./ListadoUsuarios";
import DetalleUsuario from "./DetalleUsuario";

const GestionarUsuarios = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Se monta Gestion de Usuarios");
        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<ListadoUsuarios />} />
            <Route
                path="actualizar/:idUsuario"
                element={<ActualizarUsuario />}
            />
            <Route path="crear" element={<CrearUsuario />} />
            <Route path="detalle/:idUsuario" element={<DetalleUsuario />} />
        </Routes>
    );
};

export default GestionarUsuarios;
