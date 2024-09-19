import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { URL } from "../../config";

const ActualizarTicket = ({ isAdmin }) => {
    const { idTicket } = useParams();
    const navigate = useNavigate();
    const [asuntoTicket, setAsuntoTicket] = useState("");
    const [descripcionTicket, setDescripcionTicket] = useState("");
    const [fechaCreacion, setFechaCreacion] = useState("");
    const [idEstadoTicket, setIdEstadoTicket] = useState("");
    const [idPrioridad, setIdPrioridad] = useState("");
    const [idCategoria, setIdCategoria] = useState("");
    const [idUsuarioCreador, setIdUsuarioCreador] = useState("");
    const [idUsuarioResolutor, setIdUsuarioResolutor] = useState("");

    const [estadosTickets, setEstadosTickets] = useState([]);
    const [prioridades, setPrioridades] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [usuariosNormales, setUsuariosNormales] = useState([]);
    const [usuariosResolutores, setUsuariosResolutores] = useState([]);

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
            console.log("Los datos son:", data.data);

            setAsuntoTicket(data.data.asuntoTicket);
            setDescripcionTicket(data.data.descripcionTicket);
            setFechaCreacion(data.data.fechaCreacion);
            setIdEstadoTicket(data.data.idEstadoTicket);
            setIdPrioridad(data.data.idPrioridad);
            setIdCategoria(data.data.idCategoria);
            setIdUsuarioCreador(data.data.idUsuarioCreador);
            setIdUsuarioResolutor(data.data.idUsuarioResolutor);
        } catch (error) {
            setError(error.message);
        }
    };
    const handleRegresar = () => {
        navigate(-1); // Regresa a la página anterior
    };
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
            console.log("Los datos son:", data.data);
            if (!isAdmin) {
                const cerrado = 4;
                setEstadosTickets(
                    data.data.filter(
                        (estado) => estado.idEstadoTicket !== cerrado
                    )
                );
            } else {
                setEstadosTickets(data.data);
            }
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };
    const fetchPrioridades = async () => {
        try {
            const response = await fetch(`${URL}/prioridad`, {
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
            console.log("Los datos son:", data.data);
            setPrioridades(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };
    const fetchCategorias = async () => {
        try {
            const response = await fetch(`${URL}/categoria`, {
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
            console.log("Los datos son:", data.data);
            setCategorias(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };
    const fetchUsuarios = async () => {
        try {
            const response = await fetch(`${URL}/usuario`, {
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
            console.log("Los datos usuarios son:", data.data);
            console.log(
                "Los usuarios normales son",
                data.data.filter((usuario) => usuario.idRol === 3)
            );
            setUsuariosNormales(
                data.data.filter((usuario) => usuario.idRol === 3)
            );
            console.log(
                "Los usuarios resolutores son",
                data.data.filter((usuario) => usuario.idRol === 2)
            );
            setUsuariosResolutores(
                data.data.filter((usuario) => usuario.idRol === 2)
            );
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const ticketData = {
                asuntoTicket: asuntoTicket,
                descripcionTicket: descripcionTicket,
                idEstadoTicket: idEstadoTicket,
                idPrioridad: idPrioridad,
                idCategoria: idCategoria,
                idUsuarioCreador: idUsuarioCreador,
            };

            if (idUsuarioResolutor) {
                ticketData.idUsuarioResolutor = idUsuarioResolutor;
            }

            console.log(ticketData);
            const response = await fetch(`${URL}/ticket/${idTicket}`, {
                method: "PUT",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ticketData),
            });

            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert("Ticket actualizado correctamente");

            navigate("/home/consultarTickets");
        } catch (error) {
            setError(error.message);
        }
    };

    const getNombreEstado = (idEstadoABuscar) => {
        const estado = estadosTickets.find(
            (estado) => estado.idEstadoTicket === idEstadoABuscar
        );
        return estado ? estado.estadoTicket.toLowerCase() : "Desconocido";
    };

    useEffect(() => {
        console.log("Se Monta Actualizar Ticket");
        console.log("Es admin", isAdmin);
        fetchTicket();
        fetchCategorias();
        fetchPrioridades();
        fetchEstadosTickets();
        fetchUsuarios();
    }, []);

    return (
        <div>
            <button onClick={handleRegresar}>Regresar</button>
            <h2>Actualizar el ticket con ID: {idTicket}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Asunto del Ticket:</label>
                    <input
                        type="text"
                        value={asuntoTicket}
                        onChange={(e) => setAsuntoTicket(e.target.value)}
                        required
                        disabled={"cerrado" == getNombreEstado(idEstadoTicket)}
                    />
                </div>
                <div>
                    <label>Descripcion del Ticket:</label>
                    <textarea
                        type="text"
                        value={descripcionTicket}
                        onChange={(e) => setDescripcionTicket(e.target.value)}
                        required
                        disabled={"cerrado" == getNombreEstado(idEstadoTicket)}
                    />
                </div>
                <div>
                    <label>Fecha de Creacion:</label>
                    <input
                        type="text"
                        value={new Date(fechaCreacion).toLocaleString()}
                        required
                        disabled
                    />
                </div>
                <div>
                    <label>Estado del Ticket:</label>
                    <select
                        value={idEstadoTicket}
                        onChange={(e) => setIdEstadoTicket(e.target.value)}
                        required
                        disabled={"cerrado" == getNombreEstado(idEstadoTicket)}
                    >
                        <option value="">
                            Seleccione un Estado para el ticket
                        </option>
                        {estadosTickets.map((estado) => (
                            <option
                                key={estado.idEstadoTicket}
                                value={estado.idEstadoTicket}
                            >
                                {estado.estadoTicket}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Asignar una Prioridad:</label>
                    <select
                        value={idPrioridad}
                        onChange={(e) => setIdPrioridad(e.target.value)}
                        required
                        disabled={"cerrado" == getNombreEstado(idEstadoTicket)}
                    >
                        <option value="">Seleccione una Prioridad</option>
                        {prioridades.map((prioridad) => (
                            <option
                                key={prioridad.idPrioridad}
                                value={prioridad.idPrioridad}
                            >
                                {prioridad.nombrePrioridad}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Asignar una Categoria:</label>
                    <select
                        value={idCategoria}
                        onChange={(e) => setIdCategoria(e.target.value)}
                        required
                        disabled={"cerrado" == getNombreEstado(idEstadoTicket)}
                    >
                        <option value="">Seleccione una Categoria</option>
                        {categorias.map((categoria) => (
                            <option
                                key={categoria.idCategoria}
                                value={categoria.idCategoria}
                            >
                                {categoria.nombreCategoria}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Usuario Creador:</label>
                    <select
                        value={idUsuarioCreador}
                        onChange={(e) => setIdUsuarioCreador(e.target.value)}
                        required
                        disabled
                    >
                        <option value="">Seleccione un usuario</option>
                        {usuariosNormales.map((usuario) => (
                            <option
                                key={usuario.idUsuario}
                                value={usuario.idUsuario}
                            >
                                {usuario.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Usuario Resolutor:</label>
                    <select
                        value={idUsuarioResolutor || ""}
                        onChange={(e) => setIdUsuarioResolutor(e.target.value)}
                        disabled={"cerrado" == getNombreEstado(idEstadoTicket)}
                    >
                        <option value="">Seleccione un usuario</option>
                        {usuariosResolutores.map((usuario) => (
                            <option
                                key={usuario.idUsuario}
                                value={usuario.idUsuario}
                            >
                                {usuario.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default ActualizarTicket;
