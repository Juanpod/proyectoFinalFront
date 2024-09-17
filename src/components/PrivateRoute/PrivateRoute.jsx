import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    console.log("El token en el front es:", token);
    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token", decodedToken);
        const currentTime = Date.now() / 1000; // Tiempo actual en segundos
        console.log("El tiempo actual en segundos", currentTime);
        // Verificar si el token ha expirado
        console.log("Expirado?:", decodedToken.exp < currentTime);
        if (decodedToken.exp < currentTime) {
            // Token expirado
            localStorage.removeItem("token"); // Remover el token expirado
            return <Navigate to="/login" />;
        }

        // Token es válido y no ha expirado
        return element;
    } catch (error) {
        // Si ocurre algún error al decodificar, se asume que el token es inválido
        localStorage.removeItem("token");
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
