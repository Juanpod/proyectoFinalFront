import { useEffect, useState } from "react";
import { verificarSesion } from "../verificarSesion/verificarSesion";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ListadoTickets from "./ListadoTickets";
import ActualizarTicket from "./ActualizarTicket";
import DetalleTicket from "./DetalleTicket";
const ConsultarTickets = ({ isAdmin, isUser, idUsuario }) => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Se monta Consultar Tickets");

        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ListadoTickets
                        isUser={isUser}
                        isAdmin={isAdmin}
                        idUsuario={idUsuario}
                    />
                }
            />
            <Route path="actualizar/:idTicket" element={<ActualizarTicket />} />

            <Route
                path="detalle/:idTicket"
                element={<DetalleTicket isUser={isUser} />}
            />
            <Route path="*" element={<Navigate to="home/consultarTickets" />} />
        </Routes>
    );
};

export default ConsultarTickets;
