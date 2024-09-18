import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Gestionar.css";

const ListadoSucursales = () => {
    const navigate = useNavigate();
    const [sucursales, setSucursales] = useState([]);
    const [error, setError] = useState(null);

    const fetchSucursales = async () => {
        try {
            const response = await fetch("http://localhost:3000/sucursal", {
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
            setSucursales(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleDelete = async (idSucursal) => {
        if (window.confirm("¿Estás seguro de eliminar este elemento?")) {
            try {
                const response = await fetch(
                    `http://localhost:3000/sucursal/${idSucursal}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: localStorage.getItem("token"),
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    setSucursales(
                        sucursales.filter(
                            (sucursal) => sucursal.idSucursal !== idSucursal
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
        console.log("Se monta Listado de Sucursales");
        fetchSucursales();
    }, []);

    return (
        <div>
            <h2>Gestion de Sucursales</h2>
            <button onClick={() => navigate("crear")}>
                Crear Nueva Sucursal
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
                    {sucursales.map((sucursal) => (
                        <tr key={sucursal.idSucursal}>
                            <td>{sucursal.idSucursal}</td>
                            <td>{sucursal.nombreSucursal}</td>
                            <td>
                                <div className="button-container">
                                    {/* Botón para ver detalles */}
                                    <button
                                        className="update-button"
                                        onClick={() =>
                                            navigate(
                                                `detalle/${sucursal.idSucursal}`
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
                                                `actualizar/${sucursal.idSucursal}`
                                            )
                                        }
                                    >
                                        Actualizar
                                    </button>
                                    {/* Botón para eliminar*/}
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(sucursal.idSucursal)
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

export default ListadoSucursales;
