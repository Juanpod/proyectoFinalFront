import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrearPrioridad = () => {
    const navigate = useNavigate();
    const [prioridad, setPrioridad] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/prioridad", {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombrePrioridad: prioridad }),
            });

            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "Comuna creada correctamente con id " + data.data.idPrioridad
            );

            navigate("/home/gestionar/prioridades");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Crear Nueva Prioridad</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de Prioridad:</label>
                    <input
                        type="text"
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default CrearPrioridad;
