import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../config";

const CrearCategoria = () => {
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${URL}/categoria`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombreCategoria: categoria }),
            });

            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "Comuna creada correctamente con id " + data.data.idCategoria
            );

            navigate("/home/gestionar/categorias");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Crear Nueva Categoria</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de Categoria:</label>
                    <input
                        type="text"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default CrearCategoria;
