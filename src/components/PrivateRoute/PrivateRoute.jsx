import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../verificarSesion/isTokenExpired";
import { verificarSesion } from "../verificarSesion/verificarSesion";

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("Private Route: No hay Token");
        return <Navigate to="/login" />;
    }

    try {
        if (verificarSesion(token)) {
            // Token es válido y no ha expirado
            return element;
        }

        return <Navigate to="/login" />;
    } catch (error) {
        // Si ocurre algún error al decodificar, se asume que el token es inválido
        localStorage.removeItem("token");
        console.log(
            "Private Route: Error al decodificar el Token, se elimina y se va Login"
        );
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
