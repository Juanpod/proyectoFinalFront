import "../Gestionar.css";
import { useEffect, useState } from "react";
import { verificarSesion } from "../../verificarSesion/verificarSesion";
import { Routes, Route, useNavigate } from "react-router-dom";
import CrearRol from "./CrearRol";
import ActualizarRol from "./ActualizarRol";

const GestionarRoles = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);

    const fetchRoles = async () => {
        try {
            const response = await fetch("http://localhost:3000/rol", {
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
            setRoles(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleDelete = async (idRol) => {
        if (window.confirm("¿Estás seguro de eliminar este elemento?")) {
            try {
                const response = await fetch(
                    `http://localhost:3000/rol/${idRol}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: localStorage.getItem("token"),
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    setRoles(roles.filter((rol) => rol.idRol !== idRol));
                } else {
                    throw new Error("Error al eliminar el Rol");
                }
            } catch (error) {
                console.log(error);
                setError(error.message);
            }
        }
    };

    useEffect(() => {
        console.log("Se monta Gestion de Roles");
        fetchRoles();
        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, [navigate]);
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div>
                        <h2>Gestion de Roles</h2>
                        <button onClick={() => navigate("crear")}>
                            Crear Nuevo Rol
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
                                {roles.map((rol) => (
                                    <tr key={rol.idRol}>
                                        <td>{rol.idRol}</td>
                                        <td>{rol.nombreRol}</td>
                                        <td>
                                            <div className="button-container">
                                                {/* Botón para actualizar*/}
                                                <button
                                                    className="update-button"
                                                    onClick={() =>
                                                        navigate(
                                                            `actualizar/${rol.idRol}`
                                                        )
                                                    }
                                                >
                                                    Actualizar
                                                </button>
                                                {/* Botón para eliminar*/}
                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        handleDelete(rol.idRol)
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
                }
            />
            <Route path="actualizar/:idRol" element={<ActualizarRol />} />
            <Route path="crear" element={<CrearRol />} />
        </Routes>
    );
};

export default GestionarRoles;
