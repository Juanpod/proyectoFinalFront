import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Gestionar.css";

const ListadoComunas = () => {
    const navigate = useNavigate();
    const [comunas, setComunas] = useState([]);
    const [error, setError] = useState(null);

    const fetchComunas = async () => {
        try {
            const response = await fetch("http://localhost:3000/comuna", {
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
            setComunas(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleDelete = async (idComuna) => {
        if (window.confirm("¿Estás seguro de eliminar este elemento?")) {
            try {
                const response = await fetch(
                    `http://localhost:3000/comuna/${idComuna}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: localStorage.getItem("token"),
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    setComunas(
                        comunas.filter((comuna) => comuna.idComuna !== idComuna)
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
        console.log("Se monta Gestion de Comunas");
        fetchComunas();
    }, []);
    return (
        <div>
            <h2>Gestion de Comunas</h2>
            <button onClick={() => navigate("crear")}>
                Crear Nueva Comuna
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
                    {comunas.map((comuna) => (
                        <tr key={comuna.idComuna}>
                            <td>{comuna.idComuna}</td>
                            <td>{comuna.nombreComuna}</td>
                            <td>
                                <div className="button-container">
                                    {/* Botón para actualizar*/}
                                    <button
                                        className="update-button"
                                        onClick={() =>
                                            navigate(
                                                `actualizar/${comuna.idComuna}`
                                            )
                                        }
                                    >
                                        Actualizar
                                    </button>
                                    {/* Botón para eliminar*/}
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(comuna.idComuna)
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

export default ListadoComunas;
