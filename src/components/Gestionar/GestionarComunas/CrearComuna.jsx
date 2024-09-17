import "../Gestionar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrearComuna = () => {
    const navigate = useNavigate();
    const [comuna, setComuna] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/comuna", {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombreComuna: comuna }),
            });

            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "Comuna creada correctamente con id " + data.data.idComuna
            );

            navigate("/home/gestionar/comunas");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Crear Nueva Comuna</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de Comuna:</label>
                    <input
                        type="text"
                        value={comuna}
                        onChange={(e) => setComuna(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default CrearComuna;
