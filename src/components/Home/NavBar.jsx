import { Link, Routes, Route, useNavigate, Navigate } from "react-router-dom";
const NavBar = ({ idUsuario, isAdmin, isUser, isResolutor }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    };
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <button onClick={() => navigate("/home/inicio")}>
                        Inicio
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => navigate(`/home/perfil/${idUsuario}`)}
                    >
                        {isAdmin
                            ? "Administrador"
                            : isResolutor
                            ? "Resolutor"
                            : "Usuario"}
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate("/home/consultarTickets")}>
                        Consultar Tickets
                    </button>
                </li>
                {(isUser || isAdmin) && (
                    <li>
                        <button onClick={() => navigate("/home/crearTicket")}>
                            Crear Ticket
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
    );
};

export default NavBar;
