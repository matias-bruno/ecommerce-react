import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.css'

const Layout = () => {
    return (
        <div className={styles.mainWrapper}>
            <Header />
            <main className={styles.mainContent}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;