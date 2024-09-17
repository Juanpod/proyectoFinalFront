import "../Gestionar.css";
import { useEffect } from "react";
import { verificarSesion } from "../../verificarSesion/verificarSesion";
import { useNavigate } from "react-router-dom";

const GestionarUsuarios = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Se monta Usuarios");

        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);
    return "Usuarios";
};

export default GestionarUsuarios;
