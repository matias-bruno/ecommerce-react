import styles from './Footer.module.css'
import Container from '../Container'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.footerContent}>

                    <section className={styles.companyInfo}>
                        <h3 className={styles.footerTitle}>TecnoStore</h3>
                        <p>Tecnología al alcance de todos.</p>
                        <p>Buenos Aires, Argentina</p>
                    </section>

                    <section className={styles.storeLinks}>
                        <h3 className={styles.footerTitle}>Nuestra Tienda</h3>
                        <p><Link to='/'>Inicio</Link></p>
                        <p><Link to='/productos'>Productos</Link></p>
                        <p><Link to='/login'>Login</Link></p>
                        <p><Link to='/carrito'>Carrito</Link></p>
                    </section>

                    <section className={styles.socialLinks}>
                        <h3 className={styles.footerTitle}>Contacto</h3>
                        <p><a href="https://github.com/matias-bruno" target="_blank">Github</a></p>
                        <p><a href="https://www.linkedin.com/in/matias-bruno/" target="_blank">LinkedIn</a></p>
                        <p><a href="mailto:mati.bruno1@gmail.com" target="_blank">Email</a></p>
                    </section>

                </div>
            </Container>
            <div className={styles.copy}>
                <p>© 2026 TecnoStore. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;