import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Gestionar.css";

const ListadoTipoEquipos = () => {
    const navigate = useNavigate();
    const [tiposEquipos, setTiposEquipos] = useState([]);
    const [error, setError] = useState(null);

    const fetchTiposEquipos = async () => {
        try {
            const response = await fetch("http://localhost:3000/tiposEquipos", {
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
            setTiposEquipos(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleDelete = async (idTipoEquipo) => {
        if (window.confirm("¿Estás seguro de eliminar este elemento?")) {
            try {
                const response = await fetch(
                    `http://localhost:3000/tiposEquipos/${idTipoEquipo}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: localStorage.getItem("token"),
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    setTiposEquipos(
                        tiposEquipos.filter(
                            (tipo) => tipo.idTipoEquipo !== idTipoEquipo
                        )
                    );
                    setError(null);
                } else {
                    throw new Error("Error al eliminar el tipo de equipo");
                }
            } catch (error) {
                console.log(error);
                setError(error.message);
            }
        }
    };

    useEffect(() => {
        console.log("Se monta Listado Tipos Equipos");
        fetchTiposEquipos();
    }, []);
    return (
        <div>
            <h2>Gestion de Tipos de Equipos</h2>
            <button onClick={() => navigate("crear")}>
                Crear Nuevo Tipo de Equipo
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
                    {tiposEquipos.map((tipo) => (
                        <tr key={tipo.idTipoEquipo}>
                            <td>{tipo.idTipoEquipo}</td>
                            <td>{tipo.tipoEquipo}</td>
                            <td>
                                <div className="button-container">
                                    {/* Botón para actualizar*/}
                                    <button
                                        className="update-button"
                                        onClick={() =>
                                            navigate(
                                                `actualizar/${tipo.idTipoEquipo}`
                                            )
                                        }
                                    >
                                        Actualizar
                                    </button>
                                    {/* Botón para eliminar*/}
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(tipo.idTipoEquipo)
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

export default ListadoTipoEquipos;
