import { useState, useEffect } from 'react';
import styles from './Login.module.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user, login } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            await login(email, password);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Error en el login: ', errorCode, errorMessage);
            if (errorCode === 'auth/invalid-credential') {
                setError("El email o la contraseña son incorrectos");
            } else {
                setError(errorMessage);
            }
        }
    };

    return (
        <section className={styles.loginPage}>
            <div className={styles.loginCard}>
                <h2 className={styles.title}>Iniciar Sesión</h2>
                <p className={styles.subtitle}>Acceda para continuar navegando y gestionar su cuenta.</p>

                <form className={styles.loginForm} onSubmit={handleLogin}>
                    <label className={styles.field}>
                        <span>Correo electrónico</span>
                        <input
                            className={styles.input}
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Contraseña</span>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {error && <span className={styles.errorText}>{error}</span>}

                    <button className={styles.button} type="submit">
                        Ingresar
                    </button>
                </form>
                <p className={styles.registerLink}>¿No tiene cuenta? <Link to="/registro">Regístrese aquí</Link></p>
            </div>
        </section>
    );
};

export default Login;