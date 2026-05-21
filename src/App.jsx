import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout';
import ItemListContainer from './pages/ItemListContainer/ItemListContainer';
import Container from './components/Container';
import FormularioContainer from './pages/FormularioContainer';
import Home from './pages/Home';
import DetalleProducto from './pages/DetalleProducto/DetalleProducto';
import Carrito from './pages/Carrito/Carrito';


function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={ <Home /> } />
        <Route path="/productos" element={ <ItemListContainer mensaje={'Todos los productos'} /> } />
        <Route path="/alta" element={<FormularioContainer />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
      </Route>
    </Routes>
  )
}

export default App
