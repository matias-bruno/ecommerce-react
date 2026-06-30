import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ProductsProvider } from './context/ProductsContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollToTop />
    <AuthProvider>
      <CartProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>,
)
