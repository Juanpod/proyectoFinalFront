import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { URL } from "../../../config";
const DetalleUsuario = () => {
    const navigate = useNavigate();
    const { idUsuario } = useParams();
    const [usuario, setUsuario] = useState({});

    const [nombreRol, setNombreRol] = useState("");
    const [nombreSucursal, setNombreSucursal] = useState("");
    const [error, setError] = useState(null);

    const fetchUsuario = async () => {
        try {
            const response = await fetch(`${URL}/usuario/${idUsuario}`, {
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
            console.log("Datos del usuario:", data.data);
            setUsuario(data.data);

            fetchSucursal(data.data.idSucursal);

            fetchRol(data.data.idRol);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchSucursal = async (idSucursal) => {
        try {
            const response = await fetch(`${URL}/sucursal/${idSucursal}`, {
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
            console.log("Datos de la Sucursal:", data.data);
            setNombreSucursal(data.data.nombreSucursal);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchRol = async (idRol) => {
        try {
            const response = await fetch(`${URL}/rol/${idRol}`, {
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
            console.log("Datos del Rol:", data.data);
            setNombreRol(data.data.nombreRol);
        } catch (error) {
            setError(error.message);
        }
    };
    const handleActualizarClick = () => {
        navigate(`/home/perfil/actualizar/${idUsuario}`);
    };

    useEffect(() => {
        console.log("Se monta Detalle de Usuario");
        fetchUsuario();
    }, [idUsuario]);
    return (
        <div className="elemento-detalles">
            <h2>Detalles del Usuario</h2>
            {error && <p className="error">{error}</p>}

            <table>
                <tbody>
                    <tr>
                        <td>
                            <strong>Nombre del usuario:</strong>
                        </td>
                        <td>{usuario.nombre}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Email del Usuario:</strong>
                        </td>
                        <td>{usuario.email}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>RUT del usuario:</strong>
                        </td>
                        <td>{usuario.rut}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Rol al que está asignado:</strong>
                        </td>
                        <td>{nombreRol}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Sucursal al que está asignado:</strong>
                        </td>
                        <td>{nombreSucursal}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Telefono de contacto</strong>
                        </td>
                        <td>{usuario.telefonoContacto}</td>
                    </tr>
                </tbody>
            </table>
            {nombreRol.toLowerCase() === "usuario" && (
                <button onClick={handleActualizarClick}>
                    Actualizar Usuario
                </button>
            )}
        </div>
    );
};

export default DetalleUsuario;
