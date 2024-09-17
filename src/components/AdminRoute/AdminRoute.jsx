import { Navigate } from "react-router-dom";
const AdminRoute = ({ element, isAdmin }) => {
    if (!isAdmin) {
        return <Navigate to="/home/inicio" />;
    }

    // Token es válido y no ha expirado
    return element;
};

export default AdminRoute;
