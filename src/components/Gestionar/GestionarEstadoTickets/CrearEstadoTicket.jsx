import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrearEstadoTicket = () => {
    const navigate = useNavigate();
    const [estadoTicket, setEstadoTicket] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/estadoTicket", {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ estadoTicket: estadoTicket }),
            });

            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "Comuna creada correctamente con id " + data.data.idEstadoTicket
            );

            navigate("/home/gestionar/estadosTickets");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Crear Nuevo Estado de Ticket</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de Estado de Ticket:</label>
                    <input
                        type="text"
                        value={estadoTicket}
                        onChange={(e) => setEstadoTicket(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default CrearEstadoTicket;
