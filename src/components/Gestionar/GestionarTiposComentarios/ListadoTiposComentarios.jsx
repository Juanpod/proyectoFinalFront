import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../config";
const ListadoTiposComentarios = () => {
    const navigate = useNavigate();
    const [tiposComentarios, setTiposComentarios] = useState([]);
    const [error, setError] = useState(null);

    const fetchTiposComentarios = async () => {
        try {
            const response = await fetch(`${URL}/tipoComentario`, {
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
            setTiposComentarios(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleDelete = async (idTipoComentario) => {
        if (window.confirm("¿Estás seguro de eliminar este elemento?")) {
            try {
                const response = await fetch(
                    `${URL}/tipoComentario/${idTipoComentario}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: localStorage.getItem("token"),
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    setTiposComentarios(
                        tiposComentarios.filter(
                            (tipoComentario) =>
                                tipoComentario.idTipoComentario !==
                                idTipoComentario
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
        console.log("Se monta Gestion de Tipos de Comentarios");
        fetchTiposComentarios();
    }, []);
    return (
        <div>
            <h2>Gestion de Tipos de Comentarios</h2>
            <button onClick={() => navigate("crear")}>
                Crear Nuevo Tipo de Comentario
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
                    {tiposComentarios.map((tipoComentario) => (
                        <tr key={tipoComentario.idTipoComentario}>
                            <td>{tipoComentario.idTipoComentario}</td>
                            <td>{tipoComentario.tipoComentario}</td>
                            <td>
                                <div className="button-container">
                                    {/* Botón para actualizar*/}
                                    <button
                                        className="update-button"
                                        onClick={() =>
                                            navigate(
                                                `actualizar/${tipoComentario.idTipoComentario}`
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
                                                tipoComentario.idTipoComentario
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

export default ListadoTiposComentarios;
