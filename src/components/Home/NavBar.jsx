import { Link, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";
const NavBar = ({ idUsuario, isAdmin, isUser, isResolutor }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const handleLogout = () => {
        if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    };
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <nav className={`navbar ${menuOpen ? "active" : ""}`}>
            <button className="hamburger" onClick={toggleMenu}>
                ☰
            </button>
            <ul>
                <li>
                    <button
                        onClick={() => {
                            navigate("/home/inicio");
                            toggleMenu();
                        }}
                    >
                        Inicio
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => {
                            navigate(`/home/perfil/${idUsuario}`);
                            toggleMenu();
                        }}
                    >
                        {isAdmin
                            ? "Administrador"
                            : isResolutor
                            ? "Resolutor"
                            : "Usuario"}
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => {
                            navigate("/home/consultarTickets");
                            toggleMenu();
                        }}
                    >
                        Consultar Tickets
                    </button>
                </li>
                {(isUser || isAdmin) && (
                    <li>
                        <button
                            onClick={() => {
                                navigate("/home/crearTicket");
                                toggleMenu();
                            }}
                        >
                            Crear Ticket
                        </button>
                    </li>
                )}

                {isAdmin && (
                    <li>
                        <button
                            onClick={() => {
                                navigate("/home/gestionar");
                                toggleMenu();
                            }}
                        >
                            Gestión
                        </button>
                    </li>
                )}

                <li>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
