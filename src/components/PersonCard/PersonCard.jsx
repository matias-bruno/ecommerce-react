import styles from './PersonCard.module.css'

const PersonCard = ({ name, role, image }) => {
    return (
        <div className={styles.card}>
            <img src={image} alt={name} className={styles.memberImg} />
            <div className={styles.memberDetails}>
                <h4>{name}</h4>
                <p>{role}</p>
            </div>
        </div>
    )
}

export default PersonCard;