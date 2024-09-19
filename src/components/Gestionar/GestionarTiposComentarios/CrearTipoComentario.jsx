import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../config";
const CrearTipoComentario = () => {
    const navigate = useNavigate();
    const [tipoComentario, setTipoComentario] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${URL}/tipoComentario`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tipoComentario: tipoComentario }),
            });

            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "Comuna creada correctamente con id " +
                    data.data.idTipoComentario
            );

            navigate("/home/gestionar/tiposComentarios");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Crear Nuevo Tipo de Comentario</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de Tipo de Comentario:</label>
                    <input
                        type="text"
                        value={tipoComentario}
                        onChange={(e) => setTipoComentario(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default CrearTipoComentario;
