import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { URL } from "../../../config";
const ActualizarTipoEquipo = () => {
    const { idTipoEquipo } = useParams();
    const navigate = useNavigate();
    const [tipoEquipo, setTipoEquipo] = useState("");
    const [error, setError] = useState(null);
    const [oldTipoEquipo, setOldTipoEquipo] = useState("");

    const fetchTipoEquipo = async () => {
        try {
            const response = await fetch(
                `${URL}/tiposEquipos/${idTipoEquipo}`,
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
            setTipoEquipo(data.data.tipoEquipo);
            setOldTipoEquipo(data.data.tipoEquipo);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${URL}/tiposEquipos/${idTipoEquipo}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ tipoEquipo }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "EL elemento de id " +
                    idTipoEquipo +
                    " fue actualizado correctamente a " +
                    data.data.tipoEquipo
            );

            navigate("/home/gestionar/tiposEquipos");
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        console.log("Se monta Actualizar Tipos Equipos");
        fetchTipoEquipo();
    }, [idTipoEquipo]);
    return (
        <div>
            <h2>
                Actualizar Tipo de Equipo {oldTipoEquipo} con ID: {idTipoEquipo}
            </h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Tipo de Equipo:</label>
                    <input
                        type="text"
                        value={tipoEquipo}
                        onChange={(e) => setTipoEquipo(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default ActualizarTipoEquipo;
