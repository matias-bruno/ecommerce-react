import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout/Layout';
import ProductsPage from './pages/ProductsPage';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProtectedRoute from './components/ProtectedRoute';
import SearchBar from './components/SearchBar/SearchBar';
import Search from './pages/Search'


const App = () => {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={ <Home /> } />
        <Route path="/productos" element={ <ProductsPage /> } />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
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
