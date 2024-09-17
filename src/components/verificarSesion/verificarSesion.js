import { isTokenExpired } from "../isTokenExpired/isTokenExpired";

export const verificarSesion = (token) => {
    let sesionValida = false;
    if (token) {
        //const token = localStorage.getItem("token");
        if (isTokenExpired(token)) {
            localStorage.removeItem("token");
            console.log("Token expirado");
        } else {
            console.log("verificarSesion: Token Valido");
            sesionValida = true;
        }
    } else {
        console.log("No hay token");
    }
    return sesionValida;
};
