import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ListadoTickets = ({ isAdmin, isUser, idUsuario }) => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [estados, setEstados] = useState([]);
    const [error, setError] = useState(null);

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
            console.log("Los datos de todos los tickets:", data.data);
            if (isAdmin) {
                setTickets(data.data);
                console.log(
                    "El usuario es admin, se incluyen todos los tickets"
                );
            } else if (isUser) {
                setTickets(
                    data.data.filter(
                        (ticket) => ticket.idUsuarioCreador === idUsuario
                    )
                );
                console.log(
                    "El usuario es normal, se incluyen solo los tickets creados por el"
                );
            } else {
                setTickets(
                    data.data.filter(
                        (ticket) =>
                            ticket.idUsuarioResolutor === idUsuario ||
                            ticket.idUsuarioResolutor === null
                    )
                );
                console.log(
                    "El usuario es resolutor, se incluyen solo los tickets asignados a el y sin asignar"
                );
            }
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };
    const fetchEstados = async () => {
        try {
            const response = await fetch("http://localhost:3000/estadoTicket", {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener los estados");
            }
            const data = await response.json();
            setEstados(data.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (idTicket) => {
        if (window.confirm("¿Estás seguro de eliminar este elemento?")) {
            try {
                const response = await fetch(
                    `http://localhost:3000/ticket/${idTicket}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: localStorage.getItem("token"),
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    setTickets(
                        tickets.filter((ticket) => ticket.idTicket !== idTicket)
                    );
                    setError(null);
                } else {
                    throw new Error("Error al eliminar el Ticket");
                }
            } catch (error) {
                console.log(error);
                setError(error.message);
            }
        }
    };

    const getNombreEstado = (idEstadoABuscar) => {
        const estado = estados.find(
            (estado) => estado.idEstadoTicket === idEstadoABuscar
        );
        return estado ? estado.estadoTicket : "Desconocido";
    };

    useEffect(() => {
        console.log("Se monta Listado de Tickets");
        fetchTickets();
        fetchEstados();
    }, [isAdmin, isUser, idUsuario]);
    return (
        <div>
            <h2>
                {isAdmin && "Listado de Tickets"}
                {isUser && "Listado de Tickets Creados"}
                {!isAdmin && !isUser && "Listado de Tickets Pendientes"}
            </h2>

            {error && <p className="error">{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Asunto</th>
                        <th>Estado</th>
                        <th>Estado de asignación</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.idTicket}>
                            <td>{ticket.idTicket}</td>
                            <td>{ticket.asuntoTicket}</td>

                            <td>{getNombreEstado(ticket.idEstadoTicket)}</td>
                            <td>
                                {ticket.idUsuarioResolutor
                                    ? "Asignado"
                                    : "Sin asignar"}
                            </td>
                            <td>
                                {new Date(
                                    ticket.fechaCreacion
                                ).toLocaleString()}
                            </td>
                            <td>
                                <div className="button-container">
                                    {/* Botón para ver detalles */}
                                    <button
                                        className="update-button"
                                        onClick={() =>
                                            navigate(
                                                `detalle/${ticket.idTicket}`
                                            )
                                        }
                                    >
                                        Ver detalle
                                    </button>
                                    {/* Botón para actualizar*/}
                                    {!isUser && (
                                        <button
                                            className="update-button"
                                            onClick={() =>
                                                navigate(
                                                    `actualizar/${ticket.idTicket}`
                                                )
                                            }
                                        >
                                            Actualizar
                                        </button>
                                    )}
                                    {/* Botón para eliminar*/}
                                    {isAdmin && (
                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(ticket.idTicket)
                                            }
                                        >
                                            Eliminar
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListadoTickets;
