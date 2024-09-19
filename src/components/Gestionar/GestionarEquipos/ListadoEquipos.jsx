import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ListadoEquipos = () => {
    const navigate = useNavigate();
    const [equipos, setEquipos] = useState([]);
    const [error, setError] = useState(null);

    const fetchEquipos = async () => {
        try {
            const response = await fetch("http://localhost:3000/equipo", {
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
            setEquipos(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleDelete = async (idEquipo) => {
        if (window.confirm("¿Estás seguro de eliminar este elemento?")) {
            try {
                const response = await fetch(
                    `http://localhost:3000/equipo/${idEquipo}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: localStorage.getItem("token"),
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    setEquipos(
                        equipos.filter((equipo) => equipo.idEquipo !== idEquipo)
                    );
                    setError(null);
                } else {
                    throw new Error("Error al eliminar el equipo");
                }
            } catch (error) {
                console.log(error);
                setError(error.message);
            }
        }
    };

    useEffect(() => {
        console.log("Se monta Listado de Equipo");
        fetchEquipos();
    }, []);

    return (
        <div>
            <h2>Gestion de Equipos</h2>
            <button onClick={() => navigate("crear")}>
                Crear Nuevo Equipo
            </button>

            {error && <p className="error">{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre de Equipo</th>
                        <th>Modelo de Equipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {equipos.map((equipo) => (
                        <tr key={equipo.idEquipo}>
                            <td>{equipo.idEquipo}</td>
                            <td>{equipo.nombreEquipo}</td>
                            <td>{equipo.modeloEquipo}</td>
                            <td>
                                <div className="button-container">
                                    {/* Botón para ver detalles */}
                                    <button
                                        className="update-button"
                                        onClick={() =>
                                            navigate(
                                                `detalle/${equipo.idEquipo}`
                                            )
                                        }
                                    >
                                        Ver detalle
                                    </button>
                                    {/* Botón para actualizar*/}
                                    <button
                                        className="update-button"
                                        onClick={() =>
                                            navigate(
                                                `actualizar/${equipo.idEquipo}`
                                            )
                                        }
                                    >
                                        Actualizar
                                    </button>
                                    {/* Botón para eliminar*/}
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(equipo.idEquipo)
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

export default ListadoEquipos;
