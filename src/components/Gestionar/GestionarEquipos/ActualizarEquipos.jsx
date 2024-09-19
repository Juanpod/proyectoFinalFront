import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarEquipo = () => {
    const navigate = useNavigate();
    const { idEquipo } = useParams();
    const [nombreEquipo, setNombreEquipo] = useState("");
    const [modeloEquipo, setModeloEquipo] = useState("");
    const [ipEquipo, setIpEquipo] = useState("");
    const [idUsuario, setIdUsuario] = useState("");
    const [idTipoEquipo, setIdTipoEquipo] = useState("");

    const [usuarios, setUsuarios] = useState([]);
    const [tiposEquipos, setTiposEquipos] = useState([]);

    const [error, setError] = useState(null);

    const [oldNombreEquipo, setOldNombreEquipo] = useState("");

    const fetchEquipo = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/equipo/${idEquipo}`,
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

            setNombreEquipo(data.data.nombreEquipo);
            setModeloEquipo(data.data.modeloEquipo);
            setIpEquipo(data.data.ipEquipo);
            if (data.data.idUsuario) {
                setIdUsuario(data.data.idUsuario);
            }

            setIdTipoEquipo(data.data.idTipoEquipo);
            setOldNombreEquipo(data.data.nombreEquipo);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchTiposEquipos = async () => {
        try {
            const response = await fetch("http://localhost:3000/tiposEquipos", {
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
            setTiposEquipos(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const fetchUsuarios = async () => {
        try {
            const response = await fetch("http://localhost:3000/usuario", {
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
            setUsuarios(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const equipoData = {
                nombreEquipo: nombreEquipo,
                modeloEquipo: modeloEquipo,
                ipEquipo: ipEquipo,
                idTipoEquipo: idTipoEquipo,
            };
            if (idUsuario) {
                equipoData.idUsuario = idUsuario;
            }
            console.log(equipoData);
            const response = await fetch(
                `http://localhost:3000/equipo/${idEquipo}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(equipoData),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "Equipo actualizado correctamente con id " + data.data.idEquipo
            );

            navigate("/home/gestionar/equipos");
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        console.log("Se Monta Crear Equipo");
        fetchEquipo();
        fetchTiposEquipos();
        fetchUsuarios();
    }, []);

    return (
        <div>
            <h2>
                Actualizar el equipo {oldNombreEquipo} con ID: {idEquipo}
            </h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de Equipo:</label>
                    <input
                        type="text"
                        value={nombreEquipo}
                        onChange={(e) => setNombreEquipo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Modelo de Equipo:</label>
                    <input
                        type="text"
                        value={modeloEquipo}
                        onChange={(e) => setModeloEquipo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Direccion IP de Equipo:</label>
                    <input
                        type="text"
                        value={ipEquipo}
                        onChange={(e) => setIpEquipo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Asignar a un Usuario (opcional):</label>
                    <select
                        value={idUsuario}
                        onChange={(e) => setIdUsuario(e.target.value)}
                    >
                        <option value="">Seleccione un Usuario</option>
                        {usuarios.map((usuario) => (
                            <option
                                key={usuario.idUsuario}
                                value={usuario.idUsuario}
                            >
                                {`${usuario.nombre} (RUT: ${usuario.rut})`}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Tipo de equipo:</label>
                    <select
                        value={idTipoEquipo}
                        onChange={(e) => setIdTipoEquipo(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un tipo de equipo</option>
                        {tiposEquipos.map((tipoEquipo) => (
                            <option
                                key={tipoEquipo.idTipoEquipo}
                                value={tipoEquipo.idTipoEquipo}
                            >
                                {tipoEquipo.tipoEquipo}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default ActualizarEquipo;
