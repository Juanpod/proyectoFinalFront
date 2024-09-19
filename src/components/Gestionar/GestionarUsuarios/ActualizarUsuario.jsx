import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActualizarUsuario = ({ isAdmin, isUser }) => {
    const { idUsuario } = useParams();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rut, setRut] = useState("");
    const [idRol, setIdRol] = useState("");
    const [idScurusal, setIdSucursal] = useState("");
    const [telefonoContacto, setTelefonoContacto] = useState("");

    const [roles, setRoles] = useState([]);
    const [sucursales, setSucursales] = useState([]);

    const [error, setError] = useState(null);

    const [oldNombre, setOldNombre] = useState("");

    const fetchUsuario = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/usuario/${idUsuario}`,
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

            setNombre(data.data.nombre);
            setEmail(data.data.email);
            // setPassword(data.data.ipEquipo);
            setRut(data.data.rut);
            setIdRol(data.data.idRol);
            setIdSucursal(data.data.idSucursal);
            setTelefonoContacto(data.data.telefonoContacto);
            setOldNombre(data.data.nombre);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchSucursales = async () => {
        try {
            const response = await fetch("http://localhost:3000/sucursal", {
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
            setSucursales(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await fetch("http://localhost:3000/rol", {
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
            setRoles(data.data);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const usuarioData = {
                nombre: nombre,
                email: email,
                password: password,
                rut: rut,
                idRol: idRol,
                idSucursal: idScurusal,
                telefonoContacto: telefonoContacto,
            };

            console.log(usuarioData);
            const response = await fetch(
                `http://localhost:3000/usuario/${idUsuario}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(usuarioData),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                console.log("Los datos son:", data);
                throw new Error(data.message);
            }

            window.alert("Usuario actualizado correctamente");
            if (isAdmin) {
                navigate("/home/gestionar/usuarios");
            } else {
                navigate(`/home/perfil/${idUsuario}`);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        console.log("Se Monta Crear Usuario");
        fetchUsuario();
        fetchSucursales();
        fetchRoles();
    }, []);

    return (
        <div>
            <h2>
                Actualizar el usuario {oldNombre} con ID: {idUsuario}
            </h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de Usuario:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Correo de Usuario:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isUser}
                    />
                </div>
                <div>
                    <label>Nueva Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>RUT del Usuario:</label>
                    <input
                        type="text"
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}
                        required
                        disabled={isUser}
                    />
                </div>
                <div>
                    <label>Asignar un Rol:</label>
                    <select
                        value={idRol}
                        onChange={(e) => setIdRol(e.target.value)}
                        disabled={isUser}
                    >
                        <option value="">Seleccione un Rol</option>
                        {roles.map((rol) => (
                            <option key={rol.idRol} value={rol.idRol}>
                                {rol.nombreRol}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Asignar una sucursal:</label>
                    <select
                        value={idScurusal}
                        onChange={(e) => setIdSucursal(e.target.value)}
                        required
                    >
                        <option value="">Seleccione una Sucursal</option>
                        {sucursales.map((sucursal) => (
                            <option
                                key={sucursal.idSucursal}
                                value={sucursal.idSucursal}
                            >
                                {sucursal.nombreSucursal}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Telefono del Usuario:</label>
                    <input
                        type="text"
                        value={telefonoContacto}
                        onChange={(e) => setTelefonoContacto(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default ActualizarUsuario;
