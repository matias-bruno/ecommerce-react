import styles from './Footer.module.css'
import Container from '../Container'
import PersonCard from '../PersonCard/PersonCard'
import { teamMembers } from './members';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.footerContent}>

                    <section className={styles.companyInfo}>
                        <h3 className={styles.footerTitle}>Mi E-Commerce</h3>
                        <p>Innovando en el mundo digital desde 2024.</p>
                        <p>Contacto: info@miecommerce.com</p>
                        <p>Buenos Aires, Argentina</p>
                    </section>

                    <section className={styles.teamSection}>
                        <h3 className={styles.footerTitle}>Nuestro Equipo</h3>

                        <div className={styles.cardsGrid}>
                            {teamMembers.map((member) => (
                                <PersonCard
                                    key={member.id}
                                    name={member.name}
                                    role={member.role}
                                    image={member.image}
                                />
                            ))}
                        </div>
                    </section>

                </div>
            </Container>
            <div className={styles.copy}>
                <p>© 2026 Mi Ecommerce. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;