import "./ConsultarTickets.css";
import { useEffect } from "react";
import { verificarSesion } from "../verificarSesion/verificarSesion";
import { useNavigate } from "react-router-dom";
const ConsultarTickets = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Se monta Consultar Tickets");

        if (!verificarSesion(localStorage.getItem("token"))) {
            navigate("/login");
        }
    }, []);
    return (
        <div>
            <h2>Consultar Tickets</h2>
            <p>Contenido</p>
        </div>
    );
};

export default ConsultarTickets;
