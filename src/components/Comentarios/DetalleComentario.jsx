import { useState, useEffect } from "react";

const DetalleComentario = ({ comentario }) => {
    const [tipoComentario, setTipoComentario] = useState("");

    const fetchTipoComentario = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/tipoComentario/${comentario.idTipoComentario}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }

            const data = await response.json();
            console.log("Los datos son:", data.data);
            setTipoComentario(data.data.tipoComentario);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        console.log("Se Monta comentario");
        fetchTipoComentario();
    }, []);
    return (
        <tr>
            <td>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Tipo:</strong> {tipoComentario}
                            </td>
                            <td>
                                <strong>Fecha:</strong>{" "}
                                {new Date(
                                    comentario.fechaComentario
                                ).toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">{comentario.comentario}</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    );
};

export default DetalleComentario;
