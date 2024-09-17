import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Gestionar.css";

const ActualizarRol = () => {
    const { idRol } = useParams();
    const navigate = useNavigate();
    const [rol, setRol] = useState("");
    const [error, setError] = useState(null);
    const [oldRol, setOldRol] = useState("");

    const fetchRol = async () => {
        try {
            const response = await fetch(`http://localhost:3000/rol/${idRol}`, {
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
            setRol(data.data.nombreRol);
            setOldRol(data.data.nombreRol);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/rol/${idRol}`, {
                method: "PUT",
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
                "EL elemento de id " +
                    idRol +
                    " fue actualizado correctamente a " +
                    data.data.nombreRol
            );

            navigate("/home/gestionar/roles");
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        console.log("Se monta Actualizar Roles");
        fetchRol();
    }, [idRol]);
    return (
        <div>
            <h2>
                Actualizar el Rol {oldRol} con ID: {idRol}
            </h2>
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
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default ActualizarRol;
