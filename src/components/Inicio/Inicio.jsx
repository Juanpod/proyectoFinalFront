import { useEffect, useState } from "react";
import { verificarSesion } from "../verificarSesion/verificarSesion";
import { useNavigate } from "react-router-dom";
import MonitorTickets from "./MonitorTickets";
import "./Inicio.css";
import { URL } from "../../config";

const Inicio = ({ isUser, isAdmin, idUsuario, isResolutor }) => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [estadosTickets, setEstadosTickets] = useState([]);

    const [ticketsAbiertos, setTicketsAbiertos] = useState([]);
    const [ticketsSinAsignar, seticketsSinAsignar] = useState([]);
    const [ticketsAsignados, seticketsAsignados] = useState([]);
    const [ticketsCerrados, seticketsCerrados] = useState([]);

    const estadoCerrado = 4;

    const fetchEstadosTickets = async () => {
        try {
            const response = await fetch(`${URL}/estadoTicket`, {
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
            const response = await fetch(`${URL}/ticket`, {
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
            (ticket) => ticket.idEstadoTicket !== estadoCerrado
        );
        const ticketsCerrados = tickets.filter(
            (ticket) => ticket.idEstadoTicket === estadoCerrado
        );
        const ticketsSinAsignar = tickets.filter(
            (ticket) => !ticket.idUsuarioResolutor
        );
        const ticketsAsignados = tickets.filter(
            (ticket) =>
                ticket.idUsuarioResolutor &&
                ticket.idEstadoTicket !== estadoCerrado
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
                {isUser && (
                    <MonitorTickets
                        tickets={ticketsAbiertos}
                        idUsuario={idUsuario}
                        isAdmin={isAdmin}
                        isResolutor={isResolutor}
                        etiqueta={"Tickets Abiertos"}
                    />
                )}

                {!isUser && (
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
                )}

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
