import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListadoPrioridades = () => {
    const navigate = useNavigate();
    const [prioridades, setPrioridades] = useState([]);
    const [error, setError] = useState(null);

    const fetchPrioridades = async () => {
        try {
            const response = await fetch("http://localhost:3000/prioridad", {
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

    const handleDelete = async (idPrioridad) => {
        if (window.confirm("¿Estás seguro de eliminar este elemento?")) {
            try {
                const response = await fetch(
                    `http://localhost:3000/prioridad/${idPrioridad}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: localStorage.getItem("token"),
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    setPrioridades(
                        prioridades.filter(
                            (prioridad) => prioridad.idPrioridad !== idPrioridad
                        )
                    );
                    setError(null);
                } else {
                    throw new Error("Error al eliminar la comuna");
                }
            } catch (error) {
                console.log(error);
                setError(error.message);
            }
        }
    };

    useEffect(() => {
        console.log("Se monta Listado de Prioridades");
        fetchPrioridades();
    }, []);
    return (
        <div>
            <h2>Gestion de Prioridades</h2>
            <button onClick={() => navigate("crear")}>
                Crear Nueva Prioridad
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
                    {prioridades.map((prioridad) => (
                        <tr key={prioridad.idPrioridad}>
                            <td>{prioridad.idPrioridad}</td>
                            <td>{prioridad.nombrePrioridad}</td>
                            <td>
                                <div className="button-container">
                                    {/* Botón para actualizar*/}
                                    <button
                                        className="update-button"
                                        onClick={() =>
                                            navigate(
                                                `actualizar/${prioridad.idPrioridad}`
                                            )
                                        }
                                    >
                                        Actualizar
                                    </button>
                                    {/* Botón para eliminar*/}
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(prioridad.idPrioridad)
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

export default ListadoPrioridades;
