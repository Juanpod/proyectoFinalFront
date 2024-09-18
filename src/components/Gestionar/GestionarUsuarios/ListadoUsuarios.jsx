import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Gestionar.css";

const ListadoUsuarios = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);

    const fetchUsuarios = async () => {
        try {
            const response = await fetch("http://localhost:3000/usuario", {
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
            setUsuarios(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleDelete = async (idUsuario) => {
        if (window.confirm("¿Estás seguro de eliminar este elemento?")) {
            try {
                const response = await fetch(
                    `http://localhost:3000/usuario/${idUsuario}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: localStorage.getItem("token"),
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    setUsuarios(
                        usuarios.filter(
                            (usuario) => usuario.idUsuario !== idUsuario
                        )
                    );
                    setError(null);
                } else {
                    throw new Error("Error al eliminar el usuario");
                }
            } catch (error) {
                console.log(error);
                setError(error.message);
            }
        }
    };

    useEffect(() => {
        console.log("Se monta Listado de Usuarios");
        fetchUsuarios();
    }, []);

    return (
        <div>
            <h2>Gestion de Usuarios</h2>
            <button onClick={() => navigate("crear")}>
                Crear Nuevo Usuario
            </button>

            {error && <p className="error">{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre del Usuario</th>
                        <th>Email de Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.idUsuario}>
                            <td>{usuario.idUsuario}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <div className="button-container">
                                    {/* Botón para ver detalles */}
                                    <button
                                        className="update-button"
                                        onClick={() =>
                                            navigate(
                                                `detalle/${usuario.idUsuario}`
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
                                                `actualizar/${usuario.idUsuario}`
                                            )
                                        }
                                    >
                                        Actualizar
                                    </button>
                                    {/* Botón para eliminar*/}
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(usuario.idUsuario)
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

export default ListadoUsuarios;
