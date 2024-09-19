import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { URL } from "../../../config";

const ActualizarCategoria = () => {
    const { idCategoria } = useParams();
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState("");
    const [error, setError] = useState(null);
    const [oldCategoria, setOldCategoria] = useState("");

    const fetchCategoria = async () => {
        try {
            const response = await fetch(`${URL}/categoria/${idCategoria}`, {
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
            setCategoria(data.data.nombreCategoria);
            setOldCategoria(data.data.nombreCategoria);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${URL}/categoria/${idCategoria}`, {
                method: "PUT",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombreCategoria: categoria }),
            });
            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "EL elemento de id " +
                    idCategoria +
                    " fue actualizado correctamente a " +
                    data.data.nombreCategoria
            );

            navigate("/home/gestionar/categorias");
        } catch (error) {
            setError(error.message);
        }
    };
    const handleRegresar = () => {
        navigate(-1); // Regresa a la página anterior
    };
    useEffect(() => {
        console.log("Se monta Actualizar Categoria");
        fetchCategoria();
    }, [idCategoria]);
    return (
        <div>
            <button onClick={handleRegresar}>Regresar</button>
            <h2>
                Actualizar la categoria {oldCategoria} con ID: {idCategoria}
            </h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nuevo nombre de Categoria:</label>
                    <input
                        type="text"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default ActualizarCategoria;
