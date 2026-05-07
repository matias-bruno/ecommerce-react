import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className={styles.footer__info_autor}>
                <p>Desarrollado por Matías Bruno</p>
                <p>2026</p>
            </div>
        </footer>
    );
};

export default Footer;