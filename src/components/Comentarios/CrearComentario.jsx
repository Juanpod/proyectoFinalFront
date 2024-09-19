import { useState, useEffect } from "react";
import { URL } from "../../config";

const CrearComentario = ({ idTicket, onClose, onComentarioAdded, isUser }) => {
    const [comentario, setComentario] = useState("");
    const [idTipoComentario, setIdTipoComentario] = useState("");
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

            if (isUser) {
                const tipoComentarioFiltrado = data.data.filter(
                    (tipo) =>
                        tipo.tipoComentario.toLowerCase() ==
                        "comentario de usuario"
                );
                console.log(
                    "El comentario filtrado es",
                    tipoComentarioFiltrado
                );
                setIdTipoComentario(tipoComentarioFiltrado[0].idTipoComentario);
            } else {
                const tipoComentarioFiltrado = data.data.filter(
                    (tipo) =>
                        tipo.tipoComentario.toLowerCase() !==
                        "comentario de usuario"
                );
                console.log(
                    "El comentario filtrado es",
                    tipoComentarioFiltrado
                );
                setTiposComentarios(tipoComentarioFiltrado);
            }
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/comentario`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    comentario: comentario,
                    idTipoComentario: idTipoComentario,
                    idTicket: idTicket,
                }),
            });

            if (!response.ok) {
                throw new Error("Error al crear el comentario");
            }

            await response.json();
            onComentarioAdded();
            onClose();
        } catch (error) {
            alert(error.message);
        }
    };
    useEffect(() => {
        console.log("Se Monta Crear Comentario");
        console.log("En crear comentario", isUser);
        fetchTiposComentarios();
    }, []);

    return (
        <div className="crear-comentario">
            <h3>Agregar Comentario</h3>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Comentario:</label>
                    <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Tipo de Comentario:</label>
                    <select
                        value={idTipoComentario}
                        onChange={(e) => setIdTipoComentario(e.target.value)}
                        required
                        disabled={isUser}
                    >
                        {/* Opciones de tipo de comentario */}
                        <option value="">
                            Seleccione un tipo para el comentario
                        </option>
                        {tiposComentarios.map((tipo) => (
                            <option
                                key={tipo.idTipoComentario}
                                value={tipo.idTipoComentario}
                            >
                                {tipo.tipoComentario}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Agregar Comentario</button>
                <button type="button" onClick={onClose}>
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default CrearComentario;
