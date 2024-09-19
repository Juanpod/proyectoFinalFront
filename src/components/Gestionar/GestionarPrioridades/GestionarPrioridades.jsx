import { useEffect, useState } from "react";
import { verificarSesion } from "../../verificarSesion/verificarSesion";
import { Routes, Route, useNavigate } from "react-router-dom";
import CrearPrioridad from "./CrearPrioridad";
import ActualizarPrioridad from "./ActualizarPrioridad";
import ListadoPrioridades from "./ListadoPrioridades";

const GestionarPrioridades = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Se monta Gestion de Prioridades");

        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<ListadoPrioridades />} />
            <Route
                path="actualizar/:idPrioridad"
                element={<ActualizarPrioridad />}
            />
            <Route path="crear" element={<CrearPrioridad />} />
        </Routes>
    );
};

export default GestionarPrioridades;
