import React, { useState, useEffect } from "react";
import "./monitorTickets.css";
import { Link } from "react-router-dom";

const MonitorTickets = ({
    tickets,
    idUsuario,
    isResolutor,
    isAdmin,
    etiqueta,
}) => {
    const [conteoTickets, setConteoTickets] = useState(0);

    useEffect(() => {
        let ticketsFiltrados;

        if (isAdmin) {
            ticketsFiltrados = tickets;
        } else if (isResolutor) {
            ticketsFiltrados = tickets.filter(
                (ticket) =>
                    ticket.idUsuarioResolutor === idUsuario ||
                    !ticket.idUsuarioResolutor
            );
        } else {
            ticketsFiltrados = tickets.filter(
                (ticket) => ticket.idUsuarioCreador === idUsuario
            );
        }
        setConteoTickets(ticketsFiltrados.length);
    }, [tickets, isAdmin, isResolutor]);

    return (
        <Link to="/home/consultarTickets" className="monitor-container">
            <div className="monitor-number">{conteoTickets}</div>
            <div className="monitor-label">{etiqueta}</div>
        </Link>
    );
};

export default MonitorTickets;
