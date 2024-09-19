import { useEffect, useState } from "react";
import { verificarSesion } from "../../verificarSesion/verificarSesion";
import { Routes, Route, useNavigate } from "react-router-dom";
import CrearComuna from "./CrearComuna";
import ActualizarComuna from "./ActualizarComuna";
import ListadoComunas from "./ListadoComunas";

const GestionarComunas = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Se monta Gestion de Comunas");
        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<ListadoComunas />} />
            <Route path="actualizar/:idComuna" element={<ActualizarComuna />} />
            <Route path="crear" element={<CrearComuna />} />
        </Routes>
    );
};

export default GestionarComunas;
