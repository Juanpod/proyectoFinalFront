import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { URL } from "../../../config";
const ListadoUsuarios = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);
    const [roles, setRoles] = useState([]);

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
                const response = await fetch(`${URL}/usuario/${idUsuario}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                });
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
    const fetchRoles = async () => {
        try {
            const response = await fetch(`${URL}/rol`, {
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

    const getNombreRol = (idRolABuscar) => {
        const rol = roles.find((rol) => rol.idRol === idRolABuscar);
        return rol ? rol.nombreRol : "Desconocido";
    };

    useEffect(() => {
        console.log("Se monta Listado de Usuarios");
        fetchUsuarios();
        fetchRoles();
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
                        <th>Rol de Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.idUsuario}>
                            <td>{usuario.idUsuario}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{getNombreRol(usuario.idRol)}</td>
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
                                    {usuario.idUsuario !== 1 && (
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
                                    )}
                                    {/* Botón para eliminar*/}
                                    {usuario.idUsuario !== 1 && (
                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(usuario.idUsuario)
                                            }
                                        >
                                            Eliminar
                                        </button>
                                    )}
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
