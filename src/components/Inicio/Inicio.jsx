import { useEffect } from "react";
import { verificarSesion } from "../verificarSesion/verificarSesion";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Se monta Inicio");

        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);
    return (
        <div>
            <h2>Inicio</h2>
            <p>Contenido del perfil del usuario</p>
        </div>
    );
};

export default Inicio;
