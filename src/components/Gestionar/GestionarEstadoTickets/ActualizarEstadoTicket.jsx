import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { URL } from "../../../config";
const ActualizarEstadoTicket = () => {
    const { idEstadoTicket } = useParams();
    const navigate = useNavigate();
    const [estadoTicket, setEstadoTicket] = useState("");
    const [error, setError] = useState(null);
    const [oldEstadoTicket, setOldEstadoTicket] = useState("");

    const fetchEstadoTicket = async () => {
        try {
            const response = await fetch(
                `${URL}/estadoTicket/${idEstadoTicket}`,
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
            setEstadoTicket(data.data.estadoTicket);
            setOldEstadoTicket(data.data.estadoTicket);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${URL}/estadoTicket/${idEstadoTicket}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ estadoTicket: estadoTicket }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "EL elemento de id " +
                    idEstadoTicket +
                    " fue actualizado correctamente a " +
                    data.data.estadoTicket
            );

            navigate("/home/gestionar/estadosTickets");
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        console.log("Se monta Actualizar Estado de Ticket");
        fetchEstadoTicket();
    }, [idEstadoTicket]);
    return (
        <div>
            <h2>
                Actualizar el Estado de Ticket {oldEstadoTicket} con ID:{" "}
                {idEstadoTicket}
            </h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nuevo nombre de Estado de Ticket:</label>
                    <input
                        type="text"
                        value={estadoTicket}
                        onChange={(e) => setEstadoTicket(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default ActualizarEstadoTicket;
