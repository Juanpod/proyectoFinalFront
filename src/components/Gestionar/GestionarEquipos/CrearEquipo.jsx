import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { URL } from "../../../config";

const CrearEquipo = () => {
    const navigate = useNavigate();
    const [nombreEquipo, setNombreEquipo] = useState("");
    const [modeloEquipo, setModeloEquipo] = useState("");
    const [ipEquipo, setIpEquipo] = useState("");

    const [error, setError] = useState(null);

    const [idUsuario, setIdUsuario] = useState("");
    const [usuarios, setUsuarios] = useState([]);

    const [idTipoEquipo, setIdTipoEquipo] = useState("");
    const [tiposEquipos, setTiposEquipos] = useState([]);

    const fetchTiposEquipos = async () => {
        try {
            const response = await fetch(`${URL}/tiposEquipos`, {
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
            const response = await fetch(`${URL}/usuario`, {
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
            const response = await fetch(`${URL}/equipo`, {
                method: "POST",
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(equipoData),
            });

            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert(
                "Equipo creado correctamente con id " + data.data.idEquipo
            );

            navigate("/home/gestionar/equipos");
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        console.log("Se Monta Crear Equipo");
        fetchTiposEquipos();
        fetchUsuarios();
    }, []);

    return (
        <div>
            <h2>Crear Nuevo Equipo</h2>
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
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default CrearEquipo;
