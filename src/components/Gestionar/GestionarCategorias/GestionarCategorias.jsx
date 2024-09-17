import "../Gestionar.css";
import { useEffect, useState } from "react";
import { verificarSesion } from "../../verificarSesion/verificarSesion";
import { Routes, Route, useNavigate } from "react-router-dom";
import CrearCategoria from "./CrearCategoria";
import ActualizarCategoria from "./ActualizarCategoria";

const GestionarCategorias = () => {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);

    const fetchCategorias = async () => {
        try {
            const response = await fetch("http://localhost:3000/categoria", {
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
            setCategorias(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleDelete = async (idCategoria) => {
        if (window.confirm("¿Estás seguro de eliminar este elemento?")) {
            try {
                const response = await fetch(
                    `http://localhost:3000/categoria/${idCategoria}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: localStorage.getItem("token"),
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    setCategorias(
                        categorias.filter(
                            (categoria) => categoria.idCategoria !== idCategoria
                        )
                    );
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
        console.log("Se monta Gestion de Categorias");
        fetchCategorias();
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
                        <h2>Gestion de Categorias</h2>
                        <button onClick={() => navigate("crear")}>
                            Crear Nueva Categoria
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
                                {categorias.map((categoria) => (
                                    <tr key={categoria.idCategoria}>
                                        <td>{categoria.idCategoria}</td>
                                        <td>{categoria.nombreCategoria}</td>
                                        <td>
                                            <div className="button-container">
                                                {/* Botón para actualizar*/}
                                                <button
                                                    className="update-button"
                                                    onClick={() =>
                                                        navigate(
                                                            `actualizar/${categoria.idCategoria}`
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
                                                            categoria.idCategoria
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
                }
            />
            <Route
                path="actualizar/:idCategoria"
                element={<ActualizarCategoria />}
            />
            <Route path="crear" element={<CrearCategoria />} />
        </Routes>
    );
};

export default GestionarCategorias;
