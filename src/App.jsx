import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Container from './components/Container';
import FormularioContainer from './components/FormularioContainer';
import Home from './components/Home';
import DetalleProducto from './components/DetalleProducto/DetalleProducto';


function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={ <Home /> } />
        <Route path="/productos" element={ <ItemListContainer mensaje={'Todos los productos'} /> } />
        <Route path="/alta" element={<FormularioContainer />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
      </Route>
    </Routes>
  )
}

export default App
