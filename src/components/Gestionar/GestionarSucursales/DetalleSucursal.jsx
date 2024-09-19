import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetalleSucursal = () => {
    const { idSucursal } = useParams();
    const [nombreSucursal, setNombreSucursal] = useState("");
    const [direccionSucursal, setDireccionSucursal] = useState("");

    const [nombreComuna, setNombreComuna] = useState([]);
    const [error, setError] = useState(null);

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
            fetchComuna(data.data.idComuna);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchComuna = async (idComuna) => {
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
            console.log("Los datos de la comuna son:", data.data);

            setNombreComuna(data.data.nombreComuna);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        console.log("Se monta Detalle Sucursal");
        fetchSucursal();
    }, [idSucursal]);
    return (
        <div className="elemento-detalles">
            <h2>Detalles de la Sucursal</h2>
            {error && <p className="error">{error}</p>}

            <div>
                <p>
                    <strong>Nombre de Sucursal:</strong> {nombreSucursal}
                </p>
                <p>
                    <strong>Dirección de Sucursal:</strong> {direccionSucursal}
                </p>
                <p>
                    <strong>Comuna:</strong> {nombreComuna}
                </p>
            </div>
        </div>
    );
};

export default DetalleSucursal;
