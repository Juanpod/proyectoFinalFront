import { Navigate } from "react-router-dom";
const AdminRoute = ({ element, isAdmin }) => {
    if (!isAdmin) {
        console.log("El usuario no tiene acceso a esta ruta");
        return <Navigate to="/home/inicio" />;
    }

    return element;
};

export default AdminRoute;
