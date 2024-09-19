import { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { verificarSesion } from "../verificarSesion/verificarSesion";
import { URL } from "../../config";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);

        if (!email || !password) {
            setError("Por favor, ingresa tu correo electrónico y contraseña.");
            return;
        }

        try {
            const response = await fetch(`${URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                //Inicio de sesion exitoso
                localStorage.setItem("token", data.data.token);

                console.log("Inicio de sesión exitoso", data);

                setError("");
                navigate("/home");
            } else {
                setError(data.message || "Error en el inicio de sesión.");
            }
        } catch (err) {
            setError("Hubo un error en la conexión con el servidor.");
        }
    };

    useEffect(() => {
        console.log("Se carga Login");
        console.log("URL", URL);
        if (verificarSesion(localStorage.getItem("token"))) {
            navigate("/home");
        }
    }, []);

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
