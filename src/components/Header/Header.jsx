import styles from './Header.module.css'

const Header = () => {
    return (
        <>
            <header className={[styles.header, styles.container].join(' ')}>
                {/* Aquí adentro de este enlace puede ir una imagen con el logo de la empresa */}
                {/* Por ahora lo dejamos que diga Ecommerce */}
                <a className={styles.header__logo} href="/">Ecommerce</a>
                <nav>
                    <ul className={styles.header__menu}>
                        <li><a className={styles.header__enlace_login} href="/login">Login</a></li>
                        <li><a className="" href="/productos">Productos</a></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;