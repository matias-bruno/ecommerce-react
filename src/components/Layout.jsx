import Header from './Header/Header'
import Footer from './Footer/Footer'
import Container from './Container'
import { Outlet } from 'react-router-dom'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default Layout;