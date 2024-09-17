import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Gestionar.css";

const ActualizarTipoComentario = () => {
    const { idTipoComentario } = useParams();
    const navigate = useNavigate();
    const [tipoComentario, setTipoComentario] = useState("");
    const [error, setError] = useState(null);
    const [oldTipoComentario, setOldTipoComentario] = useState("");

    const fetchTipoComentario = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/tipoComentario/${idTipoComentario}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }

            const data = await response.json();
            console.log("Los datos son:", data.data);
            setTipoComentario(data.data.tipoComentario);
            setOldTipoComentario(data.data.tipoComentario);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:3000/tipoComentario/${idTipoComentario}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ tipoComentario: tipoComentario }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "EL elemento de id " +
                    idTipoComentario +
                    " fue actualizado correctamente a " +
                    data.data.tipoComentario
            );

            navigate("/home/gestionar/tiposComentarios");
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        console.log("Se monta Actualizar Tipo de Comentario");
        fetchTipoComentario();
    }, [idTipoComentario]);
    return (
        <div>
            <h2>
                Actualizar el Tipo de Comentario {oldTipoComentario} con ID:{" "}
                {idTipoComentario}
            </h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nuevo nombre de Tipo de Comentario:</label>
                    <input
                        type="text"
                        value={tipoComentario}
                        onChange={(e) => setTipoComentario(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default ActualizarTipoComentario;
