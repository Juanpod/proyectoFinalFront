import { useEffect, useState } from "react";
import { verificarSesion } from "../../verificarSesion/verificarSesion";
import { Routes, Route, useNavigate } from "react-router-dom";
import CrearTipoComentario from "./CrearTipoComentario";
import ActualizarTipoComentario from "./ActualizarTipoComentario";
import ListadoTiposComentarios from "./ListadoTiposComentarios";

const GestionarTiposComentarios = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Se monta Gestion de Tipos de Comentarios");

        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<ListadoTiposComentarios />} />
            <Route
                path="actualizar/:idTipoComentario"
                element={<ActualizarTipoComentario />}
            />
            <Route path="crear" element={<CrearTipoComentario />} />
        </Routes>
    );
};

export default GestionarTiposComentarios;
