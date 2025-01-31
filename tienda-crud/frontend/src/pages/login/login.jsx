import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./authController"; // Importar controlador
import "./login.css";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.token);
            onLogin(); // 🔥 Llamar a onLogin para actualizar isAuthenticated en App.jsx
            navigate("/dashboard"); // ✅ Redirigir correctamente
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-logo">
                    <img src="/logo.jpg" alt="Logo" />
                </div>
                <h2>Iniciar Sesión</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Introduce tu correo"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Introduce tu contraseña"
                            required
                        />
                    </div>
                    <button className="login-button" type="submit">Ingresar</button>
                </form>
                <button className="register-button" onClick={handleRegister}>
                    Registrarse
                </button>
            </div>
        </div>
    );
};

export default Login;
