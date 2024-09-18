import { useEffect, useState } from "react";
import "../Gestionar.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { verificarSesion } from "../../verificarSesion/verificarSesion";
import ActualizarTipoEquipo from "./ActualizarTipoEquipo";
import CrearTipoEquipo from "./CrearTipoEquipo";
import ListadoTipoEquipos from "./ListadoTiposEquipos";

const GestionarTiposEquipos = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Se monta Gestion Tipos Equipos");

        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<ListadoTipoEquipos />} />
            <Route
                path="actualizar/:idTipoEquipo"
                element={<ActualizarTipoEquipo />}
            />
            <Route path="crear" element={<CrearTipoEquipo />} />
        </Routes>
    );
};

export default GestionarTiposEquipos;
