import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetalleComentario from "../Comentarios/DetalleComentario";
import CrearComentario from "../Comentarios/CrearComentario";
import { URL } from "../../config";

const DetalleTicket = ({ isUser }) => {
    const { idTicket } = useParams();
    const [ticket, setTicket] = useState("");

    const [estadoTicket, setEstadoTicket] = useState("");
    const [nombrePrioridad, setNombrePrioridad] = useState("");
    const [nombreCategoria, setNombreCategoria] = useState("");
    const [usuarioCreador, setUsuarioCreador] = useState({});
    const [usuarioResolutor, setUsuarioResolutor] = useState({});

    const [comentarios, setComentarios] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [error, setError] = useState(null);

    const fetchTicket = async () => {
        try {
            const response = await fetch(`${URL}/ticket/${idTicket}`, {
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
            console.log("Datos del ticket:", data.data);

            setTicket(data.data);
            fetchEstadoTicket(data.data.idEstadoTicket);
            fetchPrioridad(data.data.idPrioridad);
            fetchCategoria(data.data.idCategoria);
            fetchUsuarioCreador(data.data.idUsuarioCreador);
            if (data.data.idUsuarioResolutor) {
                fetchUsuarioResolutor(data.data.idUsuarioResolutor);
            }
            fetchComentarios();
            fetchEquipos(data.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchEstadoTicket = async (idEstadoTicket) => {
        try {
            const response = await fetch(
                `${URL}/estadoTicket/${idEstadoTicket}`,
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
            console.log("Datos del Estado Ticket:", data.data);
            setEstadoTicket(data.data.estadoTicket);
        } catch (error) {
            setError(error.message);
        }
    };
    const fetchPrioridad = async (idPrioridad) => {
        try {
            const response = await fetch(`${URL}/prioridad/${idPrioridad}`, {
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
            console.log("Datos de la Prioridad del ticket:", data.data);
            setNombrePrioridad(data.data.nombrePrioridad);
        } catch (error) {
            setError(error.message);
        }
    };
    const fetchCategoria = async (idCategoria) => {
        try {
            const response = await fetch(`${URL}/categoria/${idCategoria}`, {
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
            console.log("Datos de la Categoria del ticket:", data.data);
            setNombreCategoria(data.data.nombreCategoria);
        } catch (error) {
            setError(error.message);
        }
    };
    const fetchUsuarioCreador = async (idUsuario) => {
        try {
            const response = await fetch(`${URL}/usuario/${idUsuario}`, {
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
            console.log("Datos del Usuario creador:", data.data);

            setUsuarioCreador(data.data);
        } catch (error) {
            setError(error.message);
        }
    };
    const fetchUsuarioResolutor = async (idUsuario) => {
        try {
            const response = await fetch(`${URL}/usuario/${idUsuario}`, {
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
            console.log("Datos del usuario Creador:", data.data);

            setUsuarioResolutor(data.data);
        } catch (error) {
            setError(error.message);
        }
    };
    const fetchComentarios = async () => {
        try {
            const response = await fetch(`${URL}/comentario/`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener los comentarios");
            }

            const data = await response.json();
            //console.log("Los comentarios son:", data.data);
            const comentariosFiltrados = data.data.filter(
                (comentario) => comentario.idTicket == idTicket
            );
            //console.log("El ticket id:", idTicket);
            console.log("Comentarios del Ticket", comentariosFiltrados);
            setComentarios(
                data.data.filter(
                    (comentario) => comentario.idTicket == idTicket
                )
            );
        } catch (error) {
            setError(error.message);
        }
    };
    const fetchEquipos = async (ticket) => {
        try {
            const response = await fetch(`${URL}/equipo/`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener los comentarios");
            }

            const data = await response.json();
            //console.log("Los equipos son:", data.data);
            const equiposFiltrados = data.data.filter(
                (equipo) => equipo.idUsuario == ticket.idUsuarioCreador
            );
            //console.log("Id usuario creador", ticket.idUsuarioCreador);
            console.log("Equipos del Usuario", equiposFiltrados);
            setEquipos(
                data.data.filter(
                    (equipo) => equipo.idUsuario === ticket.idUsuarioCreador
                )
            );
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

            <h3>Equipos:</h3>
            {equipos.length > 0 ? (
                <table>
                    <tbody>
                        {equipos.map((equipo) => (
                            <tr key={equipo.idEquipo}>
                                <td>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong>IP Equipo:</strong>{" "}
                                                    {equipo.ipEquipo}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Modelo:</strong>
                                                    {equipo.modeloEquipo}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>{equipo.nombreEquipo}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay equipos asignados para el usuario.</p>
            )}
            {!showModal && (
                <button onClick={() => setShowModal(true)}>Comentar</button>
            )}

            {showModal && (
                <CrearComentario
                    idTicket={idTicket}
                    onClose={() => setShowModal(false)}
                    onComentarioAdded={() => fetchComentarios(idTicket)}
                    isUser={isUser}
                />
            )}
            <h3>Comentarios:</h3>
            {comentarios.length > 0 ? (
                <table>
                    <tbody>
                        {comentarios.map((comentario) => (
                            <DetalleComentario
                                key={comentario.idComentario}
                                comentario={comentario}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay comentarios para este ticket.</p>
            )}
        </div>
    );
};

export default DetalleTicket;
