import { useEffect, useState } from "react";
import { verificarSesion } from "../../verificarSesion/verificarSesion";
import { Routes, Route, useNavigate } from "react-router-dom";
import CrearEquipo from "./CrearEquipo";
import ActualizarEquipo from "./ActualizarEquipos";
import DetalleEquipo from "./DetalleEquipo";
import ListadoEquipos from "./ListadoEquipos";

const GestionarEquipos = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Se monta Gestion de Equipos");
        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<ListadoEquipos />} />
            <Route path="actualizar/:idEquipo" element={<ActualizarEquipo />} />
            <Route path="crear" element={<CrearEquipo />} />
            <Route path="detalle/:idEquipo" element={<DetalleEquipo />} />
        </Routes>
    );
};

export default GestionarEquipos;
