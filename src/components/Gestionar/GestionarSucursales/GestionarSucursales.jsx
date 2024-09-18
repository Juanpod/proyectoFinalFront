import "../Gestionar.css";
import { useEffect, useState } from "react";
import { verificarSesion } from "../../verificarSesion/verificarSesion";
import { Routes, Route, useNavigate } from "react-router-dom";
import CrearSucursal from "./CrearSucursal";
import ActualizarSucursal from "./ActualizarSucursal";
import DetalleSucursal from "./DetalleSucursal";
import ListadoSucursales from "./ListadoSucursales";

const GestionarSucursales = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Se monta Gestion de Sucursales");
        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<ListadoSucursales />} />
            <Route
                path="actualizar/:idSucursal"
                element={<ActualizarSucursal />}
            />
            <Route path="crear" element={<CrearSucursal />} />
            <Route path="detalle/:idSucursal" element={<DetalleSucursal />} />
        </Routes>
    );
};

export default GestionarSucursales;
