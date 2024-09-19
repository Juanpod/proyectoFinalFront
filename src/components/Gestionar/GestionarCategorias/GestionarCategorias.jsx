import { useEffect, useState } from "react";
import { verificarSesion } from "../../verificarSesion/verificarSesion";
import { Routes, Route, useNavigate } from "react-router-dom";
import CrearCategoria from "./CrearCategoria";
import ActualizarCategoria from "./ActualizarCategoria";
import ListadoCategorias from "./ListadoCategorias";

const GestionarCategorias = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Se monta Gestion de Categorias");
        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<ListadoCategorias />} />
            <Route
                path="actualizar/:idCategoria"
                element={<ActualizarCategoria />}
            />
            <Route path="crear" element={<CrearCategoria />} />
        </Routes>
    );
};

export default GestionarCategorias;
