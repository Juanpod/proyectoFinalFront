import "../Gestionar.css";
import { useEffect, useState } from "react";
import { verificarSesion } from "../../verificarSesion/verificarSesion";
import { Routes, Route, useNavigate } from "react-router-dom";
import CrearEstadoTicket from "./CrearEstadoTicket";
import ActualizarEstadoTicket from "./ActualizarEstadoTicket";
import ListadoEstadoTickets from "./ListadoEstadoTickets";

const GestionarEstadoTickets = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Se monta Gestion de Estados de Tickets");
        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<ListadoEstadoTickets />} />
            <Route
                path="actualizar/:idEstadoTicket"
                element={<ActualizarEstadoTicket />}
            />
            <Route path="crear" element={<CrearEstadoTicket />} />
        </Routes>
    );
};

export default GestionarEstadoTickets;
