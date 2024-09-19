import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrearTipoEquipo = () => {
    const navigate = useNavigate();
    const [tipoEquipo, setTipoEquipo] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/tiposEquipos", {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tipoEquipo }),
            });

            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "El tipo de equipo fue creado correctamente con id " +
                    data.data.idTipoEquipo
            );

            navigate("/home/gestionar/tiposEquipos");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Crear Nuevo Tipo de Equipo</h2>
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
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default CrearTipoEquipo;
