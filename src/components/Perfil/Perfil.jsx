import "./Perfil.css";
import { useEffect } from "react";
import { verificarSesion } from "../verificarSesion/verificarSesion";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Se monta Perfil");

        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);

    return (
        <div>
            <h2>Perfil</h2>
            <p>Contenido del perfil del usuario</p>
        </div>
    );
};

export default Perfil;
