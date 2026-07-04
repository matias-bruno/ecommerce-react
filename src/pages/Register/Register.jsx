import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config'
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import styles from './Register.module.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const navigate = useNavigate();
    const { user, signup } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const hasMinLength = password.length >= 8;
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);

        if (!email.trim()) {
            newErrors.email = 'El correo electrónico es obligatorio.';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Ingrese un correo electrónico válido.';
        }

        if (!password) {
            newErrors.password = 'La contraseña es obligatoria.';
        } else {
            if (!hasMinLength) {
                newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
            } else if (!hasLowercase || !hasUppercase || !hasNumber) {
                newErrors.password = 'La contraseña debe incluir una minúscula, una mayúscula y un número.';
            }
        }

        if (!passwordRepeat) {
            newErrors.passwordRepeat = 'Debe repetir la contraseña.';
        } else if (passwordRepeat !== password) {
            newErrors.passwordRepeat = 'Las contraseñas no coinciden.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError('');

        if (!validateForm()) {
            return;
        }

        try {
            const userCredential = await signup(email, password);
            await setDoc(doc(db, "users", userCredential.user.uid), {
                role: "user"
            });
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                const result = await Swal.fire({
                    title: 'Correo ya registrado',
                    text: 'Este email ya tiene una cuenta. ¿Desea iniciar sesión?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                });

                if (result.isConfirmed) {
                    navigate('/login');
                }
            } else {
                setSubmitError('Ocurrió un error. Verifique los datos e intente nuevamente.');
                Swal.fire({
                    icon: "error",
                    title: "Error al intentar el registro",
                    text: error.message
                });
            }
        }
    };

    const handleFieldChange = (field, value) => {
        if (field === 'email') {
            setEmail(value);
        } else if (field === 'password') {
            setPassword(value);
        } else {
            setPasswordRepeat(value);
        }

        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    return (
        <section className={styles.registerPage}>
            <div className={styles.registerCard}>
                <h2 className={styles.title}>Registro</h2>
                <p className={styles.subtitle}>Regístrese y cree su cuenta para poder comprar</p>

                <form className={styles.registerForm} onSubmit={handleSubmit}>
                    {submitError && <p className={styles.submitError}>{submitError}</p>}

                    <label className={styles.field}>
                        <span>Correo electrónico</span>
                        <input
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                        />
                        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </label>

                    <label className={styles.field}>
                        <span>Contraseña</span>
                        <input
                            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => handleFieldChange('password', e.target.value)}
                        />
                        {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                    </label>

                    <label className={styles.field}>
                        <span>Repetir Contraseña</span>
                        <input
                            className={`${styles.input} ${errors.passwordRepeat ? styles.inputError : ''}`}
                            type="password"
                            placeholder="Repetir Contraseña"
                            value={passwordRepeat}
                            onChange={(e) => handleFieldChange('passwordRepeat', e.target.value)}
                        />
                        {errors.passwordRepeat && <span className={styles.errorText}>{errors.passwordRepeat}</span>}
                    </label>

                    <button className={styles.button} type="submit">
                        Registrarse
                    </button>
                </form>
                <p className={styles.loginLink}>¿Ya tiene cuenta? <Link to="/login">Inicie sesión aquí</Link></p>
            </div>
        </section>
    );
};

export default Register;