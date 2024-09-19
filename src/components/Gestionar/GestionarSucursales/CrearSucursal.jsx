import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CrearSucursal = () => {
    const navigate = useNavigate();
    const [nombreSucursal, setNombreSucursal] = useState("");
    const [direccionSucursal, setDireccionSucursal] = useState("");
    const [error, setError] = useState(null);
    const [idComuna, setIdComuna] = useState("");
    const [comunas, setComunas] = useState([]);

    const fetchComunas = async () => {
        try {
            const response = await fetch("http://localhost:3000/comuna", {
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
            setComunas(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/sucursal", {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombreSucursal: nombreSucursal,
                    direccionSucursal: direccionSucursal,
                    idComuna: idComuna,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "Sucursal creada correctamente con id " + data.data.idSucursal
            );

            navigate("/home/gestionar/sucursales");
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        console.log("Se Monta Crear Sucursal");
        fetchComunas();
    }, []);

    return (
        <div>
            <h2>Crear Nueva Sucursal</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de Sucursal:</label>
                    <input
                        type="text"
                        value={nombreSucursal}
                        onChange={(e) => setNombreSucursal(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Direccion de Sucursal:</label>
                    <input
                        type="text"
                        value={direccionSucursal}
                        onChange={(e) => setDireccionSucursal(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Comuna:</label>
                    <select
                        value={idComuna}
                        onChange={(e) => setIdComuna(e.target.value)}
                        required
                    >
                        <option value="">Seleccione una comuna</option>
                        {comunas.map((comuna) => (
                            <option
                                key={comuna.idComuna}
                                value={comuna.idComuna}
                            >
                                {comuna.nombreComuna}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default CrearSucursal;
