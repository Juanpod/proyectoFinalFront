import "../Gestionar.css";
import { useEffect } from "react";
import { verificarSesion } from "../../verificarSesion/verificarSesion";
import { useNavigate } from "react-router-dom";

const GestionarSucursales = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Se monta Sucursales");

        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);
    return "Sucursales";
};

export default GestionarSucursales;
