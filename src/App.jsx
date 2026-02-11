import { BrowserRouter, Routes , Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
// import Register from './pages/Register'
import Login from './pages/Login'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import BoutiquePage from './pages/BoutiquePage'
import Contact from './pages/Contact'
import APropos from './pages/APropos'
import CataloguePage from './pages/CataloguePage'

function App() {  
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      {/* <Route path='/register' element={<Register />} /> */}
      <Route path='/login' element={<Login />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />
      <Route path="/boutique" element={<BoutiquePage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/apropos" element={<APropos />} />
      <Route path="/catologue" element={<CataloguePage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
