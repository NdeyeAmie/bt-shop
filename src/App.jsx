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
import ScrollToTop from './composants/ScrollToTop'
import OrdersPage from './pages/OrdersPage'
import OrderDetailPage from './pages/OrderDetailPage'
import ProfilePage from './pages/ProfilePage'


function App() {  
  
  return (
    <>
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path='/' element={<Home />} />
      {/* <Route path='/register' element={<Register />} /> */}
      <Route path='/login' element={<Login />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-success/:id" element={<OrderSuccessPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:id" element={<OrderDetailPage />} />
      <Route path="/boutique" element={<BoutiquePage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/apropos" element={<APropos />} />
      <Route path="/catologue" element={<CataloguePage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
