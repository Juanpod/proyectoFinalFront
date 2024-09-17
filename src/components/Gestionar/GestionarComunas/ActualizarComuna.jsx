import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Gestionar.css";

const ActualizarComuna = () => {
    const { idComuna } = useParams();
    const navigate = useNavigate();
    const [comuna, setComuna] = useState("");
    const [error, setError] = useState(null);
    const [oldComuna, setOldComuna] = useState("");

    const fetchComuna = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/comuna/${idComuna}`,
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
            setComuna(data.data.nombreComuna);
            setOldComuna(data.data.nombreComuna);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:3000/comuna/${idComuna}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ nombreComuna: comuna }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "EL elemento de id " +
                    idComuna +
                    " fue actualizado correctamente a " +
                    data.data.nombreComuna
            );

            navigate("/home/gestionar/comunas");
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        console.log("Se monta Actualizar Comuna");
        fetchComuna();
    }, [idComuna]);
    return (
        <div>
            <h2>
                Actualizar la Comuna {oldComuna} con ID: {idComuna}
            </h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nuevo nombre de Comuna:</label>
                    <input
                        type="text"
                        value={comuna}
                        onChange={(e) => setComuna(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default ActualizarComuna;
