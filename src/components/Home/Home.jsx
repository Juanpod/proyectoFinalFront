import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";
import { isTokenExpired } from "../isTokenExpired/isTokenExpired";
import Inicio from "../Inicio/Inicio";
import Perfil from "../Perfil/Perfil";
import ConsultarTickets from "../ConsultarTickets/ConsultarTickets";
import CrearTicket from "../Gestionar/GestionarTickets/CrearTicket/CrearTicket";
import Gestionar from "../Gestionar/Gestionar";
import { jwtDecode } from "jwt-decode";
import AdminRoute from "../AdminRoute/AdminRoute";

const Home = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isResolutor, setResolutor] = useState(false);
    const [isUser, setUser] = useState(false);

    const Usuario = 1;
    const Administrador = 2;
    const Resolutor = 3;

    const handleLogout = () => {
        if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    useEffect(() => {
        console.log("Se carga Home");
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            if (isTokenExpired(token)) {
                localStorage.removeItem("token");
                console.log("Token expirado");
                navigate("/login");
            } else {
                console.log("Token Valido");
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
                if (decodedToken.idRol === Administrador) {
                    setIsAdmin(true);
                    console.log("Es Admin", isAdmin);
                }
                if (decodedToken.idRol === Usuario) {
                    setUser(true);
                    console.log("Es Usuario", isUser);
                }
                if (decodedToken.idRol === Resolutor) {
                    setResolutor(true);
                    console.log("Es Resolutor", isResolutor);
                }
            }
        } else {
            console.log("No hay token");
            navigate("/login");
        }
    }, [isAdmin]);

    return (
        <div className="home-wrapper">
            <nav className="navbar">
                <ul>
                    <li>
                        <button onClick={() => navigate("/home/inicio")}>
                            Inicio
                        </button>
                    </li>
                    <li>
                        <button onClick={() => navigate("/home/perfil")}>
                            Perfil
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate("/home/consultarTickets")}
                        >
                            Consultar Tickets
                        </button>
                    </li>
                    {isUser && (
                        <li>
                            <button
                                onClick={() => navigate("/home/crearTicket")}
                            >
                                Solicitar Soporte Técnico
                            </button>
                        </li>
                    )}

                    {isAdmin && (
                        <li>
                            <button onClick={() => navigate("/home/gestionar")}>
                                Gestión
                            </button>
                        </li>
                    )}

                    <li>
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    </li>
                </ul>
            </nav>

            <div className="content">
                <Routes>
                    <Route path="inicio" element={<Inicio />} />
                    <Route path="perfil" element={<Perfil />} />
                    <Route
                        path="consultarTickets"
                        element={<ConsultarTickets />}
                    />
                    <Route path="crearTicket" element={<CrearTicket />} />
                    <Route
                        path="gestionar/*"
                        element={
                            <AdminRoute
                                element={<Gestionar />}
                                isAdmin={isAdmin}
                            />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};

export default Home;
