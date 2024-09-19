import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarSucursal = () => {
    const { idSucursal } = useParams();
    const navigate = useNavigate();
    const [nombreSucursal, setNombreSucursal] = useState("");
    const [direccionSucursal, setDireccionSucursal] = useState("");
    const [error, setError] = useState(null);
    const [oldNombreSucursal, setOldNombreSucursal] = useState("");
    const [idComuna, setIdComuna] = useState("");
    const [comunas, setComunas] = useState([]);

    const fetchSucursal = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/sucursal/${idSucursal}`,
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
            setNombreSucursal(data.data.nombreSucursal);
            setDireccionSucursal(data.data.direccionSucursal);
            setIdComuna(data.data.idComuna);
            setOldNombreSucursal(data.data.nombreSucursal);
        } catch (error) {
            setError(error.message);
        }
    };

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
            const response = await fetch(
                `http://localhost:3000/sucursal/${idSucursal}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombreSucursal: nombreSucursal,
                        direccionSucursal: direccionSucursal,
                        idComuna: idComuna,
                    }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "EL elemento de id " +
                    idSucursal +
                    " fue actualizado correctamente"
            );

            navigate("/home/gestionar/sucursales");
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        console.log("Se monta Actualizar Sucursal");
        fetchSucursal();
        fetchComunas();
    }, [idSucursal]);
    return (
        <div>
            <h2>
                Actualizar la Sucursal {oldNombreSucursal} con ID: {idSucursal}
            </h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nuevo nombre de Comuna:</label>
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
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default ActualizarSucursal;
