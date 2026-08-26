import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo.jsx';
import seoData from '../../data/seoData.js';

const NotFound = () => {
    return (
        <>
            <Seo {...seoData.notFound} />
            <section className={styles.notFoundPage}>
                <div className={styles.notFoundCard}>
                    <p className={styles.code}>404</p>
                    <h1 className={styles.title}>Página no encontrada</h1>
                    <p className={styles.subtitle}>
                        La dirección que ingresó no existe o fue movida.
                        Verifique la URL o vuelva al inicio para seguir navegando.
                    </p>
                    <Link to="/" className={styles.button}>
                        Volver al inicio
                    </Link>
                </div>
            </section>
        </>
    );
};

export default NotFound;
