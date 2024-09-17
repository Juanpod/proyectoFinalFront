import "../Gestionar.css";
import { useEffect } from "react";
import { verificarSesion } from "../../verificarSesion/verificarSesion";
import { useNavigate } from "react-router-dom";

const GestionarEquipos = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Se monta Equipos");

        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);
    return "Equipos";
};

export default GestionarEquipos;
