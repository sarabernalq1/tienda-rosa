import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import Register from './pages/Register'   

export default function App(){
  return (
    <div className="font-sans bg-pink-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/categoria/:name' element={<CategoryPage/>} />
          <Route path='/producto/:id' element={<ProductDetail/>} />
          <Route path='/carrito' element={<Cart/>} />
          <Route path='/favoritos' element={<Favorites/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} /> {/* ✅ nueva ruta */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

