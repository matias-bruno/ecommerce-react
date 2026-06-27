import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout/Layout';
import ItemListContainer from './pages/ItemListContainer/ItemListContainer';
import Home from './pages/Home';
import DetalleProducto from './pages/DetalleProducto/DetalleProducto';
import Carrito from './pages/Carrito/Carrito';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProtectedRoute from './components/ProtectedRoute';
import SearchBar from './components/SearchBar/SearchBar';
import Search from './pages/Search/Search'


function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={ <Home /> } />
        <Route path="/productos" element={ <ItemListContainer mensaje={'Todos los productos'} /> } />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/busqueda" element={<Search />} />
      </Route>
    </Routes>
  )
}

export default App
