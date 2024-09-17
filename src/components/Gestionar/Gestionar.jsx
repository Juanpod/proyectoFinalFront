import "./Gestionar.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import GestionarEquipos from "../Gestionar/GestionarEquipos/GestionarEquipos";
import GestionarTiposEquipos from "../Gestionar/GestionarTiposEquipos/GestionarTiposEquipos";
import GestionarRoles from "../Gestionar/GestionarRoles/GestionarRoles";
import GestionarComunas from "../Gestionar/GestionarComunas/GestionarComunas";
import GestionarSucursales from "../Gestionar/GestionarSucursales/GestionarSucursales";
import GestionarEstadoTickets from "../Gestionar/GestionarEstadoTickets/GestionarEstadoTickets";
import GestionarPrioridades from "../Gestionar/GestionarPrioridades/GestionarPrioridades";
import GestionarCategorias from "../Gestionar/GestionarCategorias/GestionarCategorias";
import GestionarUsuarios from "../Gestionar/GestionarUsuarios/GestionarUsuarios";
import GestionarTiposComentarios from "../Gestionar/GestionarTiposComentarios/GestionarTiposComentarios";
import { useEffect } from "react";
import { verificarSesion } from "../verificarSesion/verificarSesion";

const Gestionar = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Se monta Gestionar");

        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="gestionar-wrapper">
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="gestionar-buttons">
                            <button onClick={() => navigate("tiposEquipos")}>
                                Gestionar Tipos de Equipos
                            </button>
                            <button onClick={() => navigate("equipos")}>
                                Gestionar Equipos
                            </button>
                            <button onClick={() => navigate("roles")}>
                                Gestionar Roles
                            </button>
                            <button onClick={() => navigate("comunas")}>
                                Gestionar Comunas
                            </button>
                            <button onClick={() => navigate("sucursales")}>
                                Gestionar Sucursales
                            </button>
                            <button onClick={() => navigate("estadosTickets")}>
                                Gestionar Estados de Tickets
                            </button>
                            <button onClick={() => navigate("prioridades")}>
                                Gestionar Prioridades
                            </button>
                            <button onClick={() => navigate("categorias")}>
                                Gestionar Categorias
                            </button>
                            <button
                                onClick={() => navigate("tiposComentarios")}
                            >
                                Gestionar Tipos de Comentarios
                            </button>

                            <button onClick={() => navigate("usuarios")}>
                                Gestionar Usuarios
                            </button>
                        </div>
                    }
                />
                <Route path="equipos" element={<GestionarEquipos />} />
                <Route
                    path="tiposEquipos/*"
                    element={<GestionarTiposEquipos />}
                />
                <Route path="roles/*" element={<GestionarRoles />} />
                <Route path="comunas/*" element={<GestionarComunas />} />
                <Route path="sucursales/*" element={<GestionarSucursales />} />
                <Route
                    path="estadosTickets/*"
                    element={<GestionarEstadoTickets />}
                />
                <Route
                    path="prioridades/*"
                    element={<GestionarPrioridades />}
                />
                <Route path="categorias/*" element={<GestionarCategorias />} />
                <Route
                    path="tiposComentarios/*"
                    element={<GestionarTiposComentarios />}
                />
                <Route path="usuarios/*" element={<GestionarUsuarios />} />
            </Routes>
        </div>
    );
};

export default Gestionar;
