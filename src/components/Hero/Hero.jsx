import styles from './Hero.module.css'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate();
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay}>
        <div className={styles.heroContent}>
          <h1>Tecnología para tu día a día</h1>

          <p>
            Descubre notebooks, accesorios y productos modernos
            para potenciar tu espacio digital.
          </p>

          <button onClick={() => navigate("/productos")} className={styles.heroContentButton}>Ver productos</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;