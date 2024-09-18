import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetalleTicket = () => {
    const { idTicket } = useParams();
    const [ticket, setTicket] = useState("");

    const [estadoTicket, setEstadoTicket] = useState("");
    const [nombrePrioridad, setNombrePrioridad] = useState("");
    const [nombreCategoria, setNombreCategoria] = useState("");
    const [usuarioCreador, setUsuarioCreador] = useState({});
    const [usuarioResolutor, setUsuarioResolutor] = useState({});

    const [error, setError] = useState(null);

    const fetchTicket = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/ticket/${idTicket}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }

            const data = await response.json();
            console.log("Los datos son del ticket:", data.data);

            setTicket(data.data);
            fetchEstadoTicket(data.data.idEstadoTicket);
            fetchPrioridad(data.data.idPrioridad);
            fetchCategoria(data.data.idCategoria);
            fetchUsuarioCreador(data.data.idUsuarioCreador);
            if (data.data.idUsuarioResolutor) {
                fetchUsuarioResolutor(data.data.idUsuarioResolutor);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchEstadoTicket = async (idEstadoTicket) => {
        try {
            const response = await fetch(
                `http://localhost:3000/estadoTicket/${idEstadoTicket}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }

            const data = await response.json();
            console.log("Los datos son:", data.data);
            setEstadoTicket(data.data.estadoTicket);
        } catch (error) {
            setError(error.message);
        }
    };
    const fetchPrioridad = async (idPrioridad) => {
        try {
            const response = await fetch(
                `http://localhost:3000/prioridad/${idPrioridad}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }

            const data = await response.json();
            console.log("Los datos son:", data.data);
            setNombrePrioridad(data.data.nombrePrioridad);
        } catch (error) {
            setError(error.message);
        }
    };
    const fetchCategoria = async (idCategoria) => {
        try {
            const response = await fetch(
                `http://localhost:3000/categoria/${idCategoria}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }

            const data = await response.json();
            console.log("Los datos son:", data.data);
            setNombreCategoria(data.data.nombreCategoria);
        } catch (error) {
            setError(error.message);
        }
    };
    const fetchUsuarioCreador = async (idUsuario) => {
        try {
            const response = await fetch(
                `http://localhost:3000/usuario/${idUsuario}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }

            const data = await response.json();
            console.log("Los datos son:", data.data);

            setUsuarioCreador(data.data);
        } catch (error) {
            setError(error.message);
        }
    };
    const fetchUsuarioResolutor = async (idUsuario) => {
        try {
            const response = await fetch(
                `http://localhost:3000/usuario/${idUsuario}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }

            const data = await response.json();
            console.log("Los datos son:", data.data);

            setUsuarioResolutor(data.data);
        } catch (error) {
            setError(error.message);
        }
    };
    useEffect(() => {
        console.log("Se Monta Detalle Ticket");
        fetchTicket();
    }, []);
    return (
        <div className="elemento-detalles">
            <h2>Detalles del Ticket N°: {idTicket}</h2>
            {error && <p className="error">{error}</p>}

            <table>
                <tbody>
                    <tr>
                        <td>
                            <strong>Asunto del Ticket:</strong>
                        </td>
                        <td>{ticket.asuntoTicket}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Descripción del Ticket:</strong>
                        </td>
                        <td>{ticket.descripcionTicket}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Fecha de Creación:</strong>
                        </td>
                        <td>
                            {new Date(ticket.fechaCreacion).toLocaleString()}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Estado del Ticket:</strong>
                        </td>
                        <td>{estadoTicket}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Prioridad del Ticket:</strong>
                        </td>
                        <td>{nombrePrioridad}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Categoría del Ticket:</strong>
                        </td>
                        <td>{nombreCategoria}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Usuario Creador:</strong>
                        </td>
                        <td>{usuarioCreador.nombre}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Usuario Resolutor:</strong>
                        </td>
                        <td>
                            {ticket.idUsuarioResolutor
                                ? usuarioResolutor.nombre
                                : "Sin asignar"}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DetalleTicket;
