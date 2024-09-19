import { Link, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";
import { isTokenExpired } from "../verificarSesion/isTokenExpired";
import Inicio from "../Inicio/Inicio";
import Perfil from "../Perfil/Perfil";
import ConsultarTickets from "../ConsultarTickets/ConsultarTickets";
import CrearTicket from "../CrearTicket/CrearTicket";
import Gestionar from "../Gestionar/Gestionar";
import { jwtDecode } from "jwt-decode";
import AdminRoute from "../AdminRoute/AdminRoute";
import ListadoUsuarios from "../Gestionar/GestionarUsuarios/ListadoUsuarios";
import { verificarSesion } from "../verificarSesion/verificarSesion";
import NavBar from "./NavBar";
const Home = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isResolutor, setResolutor] = useState(false);
    const [isUser, setUser] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [idUsuario, setIdUsuario] = useState("");

    const Administrador = 1;
    const Resolutor = 2;
    const Usuario = 3;

    useEffect(() => {
        console.log("Se carga Home");

        const token = localStorage.getItem("token");
        if (!verificarSesion(token)) {
            navigate("/login");
        }

        const decodedToken = jwtDecode(token);
        console.log("Token Valido", decodedToken);

        setNombreUsuario(decodedToken.nombre);
        setIdUsuario(decodedToken.idUsuario);

        switch (decodedToken.idRol) {
            case Administrador:
                setIsAdmin(true);
                console.log("Es Admin");
                break;
            case Usuario:
                setUser(true);
                console.log("Es Usuario");
                break;
            case Resolutor:
                setResolutor(true);
                console.log("Es Resolutor");
                break;
            default:
                console.log("Rol no reconocido");
                break;
        }
    }, []);

    return (
        <div className="home-wrapper">
            <NavBar
                isUser={isUser}
                isAdmin={isAdmin}
                isResolutor={isResolutor}
                idUsuario={idUsuario}
            />
            <div className="content">
                <p>Bienvenido, {nombreUsuario}.</p>

                <Routes>
                    <Route
                        path="inicio"
                        element={
                            <Inicio
                                isUser={isUser}
                                isAdmin={isAdmin}
                                idUsuario={idUsuario}
                                isResolutor={isResolutor}
                            />
                        }
                    />
                    <Route
                        path="perfil/*"
                        element={
                            <Perfil
                                isUser={isUser}
                                isAdmin={isAdmin}
                                isResolutor={isResolutor}
                            />
                        }
                    />
                    <Route
                        path="consultarTickets/*"
                        element={
                            <ConsultarTickets
                                isUser={isUser}
                                isAdmin={isAdmin}
                                idUsuario={idUsuario}
                            />
                        }
                    />
                    <Route
                        path="crearTicket"
                        element={
                            <CrearTicket
                                isUser={isUser}
                                isAdmin={isAdmin}
                                idUsuario={idUsuario}
                            />
                        }
                    />
                    <Route
                        path="gestionar/*"
                        element={
                            <AdminRoute
                                element={<Gestionar />}
                                isAdmin={isAdmin}
                            />
                        }
                    />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
            </div>
        </div>
    );
};

export default Home;
