import { useEffect } from "react";
import { verificarSesion } from "../verificarSesion/verificarSesion";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import DetalleUsuario from "../Gestionar/GestionarUsuarios/DetalleUsuario";
import ActualizarUsuario from "../Gestionar/GestionarUsuarios/ActualizarUsuario";

const Perfil = ({ isAdmin, isUser }) => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Se monta Perfil");
        console.log("Es Admin?", isAdmin);
        console.log("Es usuario?", isUser);
        console.log("Es resolutor?", !isAdmin && !isUser);
        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);

    return (
        <Routes>
            <Route
                path="/:idUsuario"
                element={<DetalleUsuario isUser={isUser} isAdmin={isAdmin} />}
            />
            <Route
                path="actualizar/:idUsuario"
                element={
                    <ActualizarUsuario isUser={isUser} isAdmin={isAdmin} />
                }
            />
        </Routes>
    );
};

export default Perfil;
