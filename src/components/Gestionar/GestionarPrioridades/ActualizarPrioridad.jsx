import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarPrioridad = () => {
    const { idPrioridad } = useParams();
    const navigate = useNavigate();
    const [prioridad, setPrioridad] = useState("");
    const [error, setError] = useState(null);
    const [oldPrioridad, setOldPrioridad] = useState("");

    const fetchPrioridad = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/prioridad/${idPrioridad}`,
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
            setPrioridad(data.data.nombrePrioridad);
            setOldPrioridad(data.data.nombrePrioridad);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:3000/prioridad/${idPrioridad}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ nombrePrioridad: prioridad }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "EL elemento de id " +
                    idPrioridad +
                    " fue actualizado correctamente a " +
                    data.data.nombrePrioridad
            );

            navigate("/home/gestionar/prioridades");
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        console.log("Se monta Actualizar Prioridad");
        fetchPrioridad();
    }, [idPrioridad]);
    return (
        <div>
            <h2>
                Actualizar la Comuna {oldPrioridad} con ID: {idPrioridad}
            </h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nuevo nombre de Prioridad:</label>
                    <input
                        type="text"
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default ActualizarPrioridad;
