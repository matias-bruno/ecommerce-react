import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout';
import ItemListContainer from './pages/ItemListContainer/ItemListContainer';
import Container from './components/Container';
import Home from './pages/Home';
import DetalleProducto from './pages/DetalleProducto/DetalleProducto';
import Carrito from './pages/Carrito/Carrito';
import Dashboard from './pages/Dashboard/Dashboard';


function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={ <Home /> } />
        <Route path="/productos" element={ <ItemListContainer mensaje={'Todos los productos'} /> } />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
