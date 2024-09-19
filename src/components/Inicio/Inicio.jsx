import { useEffect, useState } from "react";
import { verificarSesion } from "../verificarSesion/verificarSesion";
import { useNavigate } from "react-router-dom";
import MonitorTickets from "./MonitorTickets";
import "./Inicio.css";

const Inicio = ({ isUser, isAdmin, idUsuario, isResolutor }) => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [estadosTickets, setEstadosTickets] = useState([]);

    const [ticketsAbiertos, setTicketsAbiertos] = useState([]);
    const [ticketsSinAsignar, seticketsSinAsignar] = useState([]);
    const [ticketsAsignados, seticketsAsignados] = useState([]);
    const [ticketsCerrados, seticketsCerrados] = useState([]);

    const fetchEstadosTickets = async () => {
        try {
            const response = await fetch("http://localhost:3000/estadoTicket", {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }
            const data = await response.json();
            console.log("Los estados de tickets:", data.data);
            setEstadosTickets(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };
    const fetchTickets = async () => {
        try {
            const response = await fetch("http://localhost:3000/ticket", {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }
            const data = await response.json();
            console.log("Todos los tickets:", data.data);
            let ticketsPorTipoUsuario;
            if (isAdmin) {
                ticketsPorTipoUsuario = data.data;
                setTickets(ticketsPorTipoUsuario);

                console.log(
                    "El usuario es admin, se incluyen todos los tickets"
                );
            } else if (isUser) {
                ticketsPorTipoUsuario = data.data.filter(
                    (ticket) => ticket.idUsuarioCreador === idUsuario
                );
                setTickets(ticketsPorTipoUsuario);

                console.log(
                    "El usuario es normal, se incluyen solo los tickets creados por el"
                );
            } else {
                ticketsPorTipoUsuario = data.data.filter(
                    (ticket) =>
                        ticket.idUsuarioResolutor === idUsuario ||
                        ticket.idUsuarioResolutor === null
                );
                setTickets(ticketsPorTipoUsuario);
                console.log(
                    "El usuario es resolutor, se incluyen solo los tickets asignados a el y sin asignar"
                );
            }
            filtrarTicketsPorEstado(ticketsPorTipoUsuario);
            console.log("Tickets por tipo de usuario", ticketsPorTipoUsuario);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };
    const filtrarTicketsPorEstado = (tickets) => {
        const ticketsAbiertos = tickets.filter(
            (ticket) => getNombreEstado(ticket.idEstadoTicket) !== "cerrado"
        );
        const ticketsCerrados = tickets.filter(
            (ticket) => getNombreEstado(ticket.idEstadoTicket) === "cerrado"
        );
        const ticketsSinAsignar = tickets.filter(
            (ticket) => !ticket.idUsuarioResolutor
        );
        const ticketsAsignados = tickets.filter(
            (ticket) => ticket.idUsuarioResolutor
        );
        console.log("Tickets Abiertos", ticketsAbiertos);
        setTicketsAbiertos(ticketsAbiertos);
        console.log("Tickets Cerrados", ticketsCerrados);
        seticketsCerrados(ticketsCerrados);
        console.log("Tickets Sin Asignar", ticketsSinAsignar);
        seticketsSinAsignar(ticketsSinAsignar);
        console.log("Tickets Asignados", ticketsAsignados);
        seticketsAsignados(ticketsAsignados);
    };

    const getNombreEstado = (idEstadoABuscar) => {
        const estado = estadosTickets.find(
            (estado) => estado.idEstadoTicket === idEstadoABuscar
        );
        return estado ? estado.estadoTicket.toLowerCase() : "Desconocido";
    };
    useEffect(() => {
        console.log("Se monta Inicio");
        console.log(isAdmin);
        console.log(isUser);
        console.log(isResolutor);
        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
        fetchEstadosTickets();
        fetchTickets();
    }, [isAdmin, isUser, isResolutor]);

    return (
        <div>
            <h2>Inicio</h2>
            {error && <p className="error">{error}</p>}
            <div className="container-monitores">
                {isUser ||
                    (isAdmin && (
                        <MonitorTickets
                            tickets={ticketsAbiertos}
                            idUsuario={idUsuario}
                            isAdmin={isAdmin}
                            isResolutor={isResolutor}
                            etiqueta={"Tickets Abiertos"}
                        />
                    ))}

                {isAdmin ||
                    (isResolutor && (
                        <>
                            <MonitorTickets
                                tickets={ticketsSinAsignar}
                                idUsuario={idUsuario}
                                isAdmin={isAdmin}
                                isResolutor={isResolutor}
                                etiqueta={"Tickets Sin Asignar"}
                            />
                            <MonitorTickets
                                tickets={ticketsAsignados}
                                idUsuario={idUsuario}
                                isAdmin={isAdmin}
                                isResolutor={isResolutor}
                                etiqueta={"Tickets Asignados"}
                            />
                        </>
                    ))}

                <MonitorTickets
                    tickets={ticketsCerrados}
                    idUsuario={idUsuario}
                    isAdmin={isAdmin}
                    isResolutor={isResolutor}
                    etiqueta={"Tickets Cerrados"}
                />
            </div>
        </div>
    );
};

export default Inicio;
