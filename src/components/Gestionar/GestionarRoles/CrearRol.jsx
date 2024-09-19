import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../config";
const CrearRol = () => {
    const navigate = useNavigate();
    const [rol, setRol] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${URL}/rol`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombreRol: rol }),
            });

            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "El Rol creado correctamente con id " + data.data.idRol
            );

            navigate("/home/gestionar/roles");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Crear Nuevo Rol</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Rol:</label>
                    <input
                        type="text"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default CrearRol;
