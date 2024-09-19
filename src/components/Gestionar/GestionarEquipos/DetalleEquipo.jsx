import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { URL } from "../../../config";

const DetalleEquipo = () => {
    const { idEquipo } = useParams();
    const [equipo, setEquipo] = useState({});

    const [usuario, setUsuario] = useState({});
    const [tipoEquipo, setTipoEquipo] = useState("");
    const [error, setError] = useState(null);

    const fetchEquipo = async () => {
        try {
            const response = await fetch(`${URL}/equipo/${idEquipo}`, {
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
            setEquipo(data.data);
            //setNombreEquipo(data.data.nombreEquipo);
            //setModeloEquipo(data.data.modeloEquipo);
            fetchTipoEquipo(data.data.idTipoEquipo);
            if (data.data.idUsuario) {
                fetchUsuario(data.data.idUsuario);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchTipoEquipo = async (idTipoEquipo) => {
        try {
            const response = await fetch(
                `${URL}/tiposEquipos/${idTipoEquipo}`,
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
            setTipoEquipo(data.data.tipoEquipo);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchUsuario = async (idUsuario) => {
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
            console.log("Los datos son:", data.data);
            setUsuario(data.data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        console.log("Se monta Detalle de Equipo");
        fetchEquipo();
    }, [idEquipo]);
    return (
        <div className="elemento-detalles">
            <h2>Detalles del Equipo</h2>
            {error && <p className="error">{error}</p>}

            <table>
                <tbody>
                    <tr>
                        <td>
                            <strong>Nombre de Equipo:</strong>
                        </td>
                        <td>{equipo.nombreEquipo}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Modelo del Equipo:</strong>
                        </td>
                        <td>{equipo.modeloEquipo}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>IP del equipo:</strong>
                        </td>
                        <td>
                            {equipo.ipEquipo
                                ? equipo.ipEquipo
                                : "Sin IP registrada"}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Usuario al que está asignado:</strong>
                        </td>
                        <td>
                            {usuario.nombre
                                ? `${usuario.nombre} (RUT: ${usuario.rut})`
                                : "Sin asignación"}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Tipo de Equipo:</strong>
                        </td>
                        <td>{tipoEquipo}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DetalleEquipo;
