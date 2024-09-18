import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Gestionar.css";

const ListadoEstadoTickets = () => {
    const navigate = useNavigate();
    const [estadosTickets, setEstadosTickets] = useState([]);
    const [error, setError] = useState(null);

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
            console.log("Los datos son:", data.data);
            setEstadosTickets(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleDelete = async (idEstadoTicket) => {
        if (window.confirm("¿Estás seguro de eliminar este elemento?")) {
            try {
                const response = await fetch(
                    `http://localhost:3000/estadoTicket/${idEstadoTicket}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: localStorage.getItem("token"),
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    setEstadosTickets(
                        estadosTickets.filter(
                            (estadoTicket) =>
                                estadoTicket.idEstadoTicket !== idEstadoTicket
                        )
                    );
                    setError(null);
                } else {
                    throw new Error("Error al eliminar la categoria");
                }
            } catch (error) {
                console.log(error);
                setError(error.message);
            }
        }
    };

    useEffect(() => {
        console.log("Se monta Listado de Estados de Tickets");
        fetchEstadosTickets();
    }, []);
    return (
        <div>
            <h2>Gestion de Estados de Tickets</h2>
            <button onClick={() => navigate("crear")}>
                Crear Nuevo Estado de Ticket
            </button>

            {error && <p className="error">{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {estadosTickets.map((estadoTicket) => (
                        <tr key={estadoTicket.idEstadoTicket}>
                            <td>{estadoTicket.idEstadoTicket}</td>
                            <td>{estadoTicket.estadoTicket}</td>
                            <td>
                                <div className="button-container">
                                    {/* Botón para actualizar*/}
                                    <button
                                        className="update-button"
                                        onClick={() =>
                                            navigate(
                                                `actualizar/${estadoTicket.idEstadoTicket}`
                                            )
                                        }
                                    >
                                        Actualizar
                                    </button>
                                    {/* Botón para eliminar*/}
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(
                                                estadoTicket.idEstadoTicket
                                            )
                                        }
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListadoEstadoTickets;
