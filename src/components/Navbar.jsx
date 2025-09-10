import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, Search } from 'lucide-react'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import categorias from '../data/categorias'

export default function Navbar(){
  const { cart, favorites, user, logout } = useContext(ShopContext)
  const [q,setQ] = useState('')
  const navigate = useNavigate()

  return (
    <header className="bg-white shadow sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-extrabold text-pink-600">FEMME ROSA</Link>
        </div>

        <nav className="hidden md:flex gap-6 text-pink-700 font-medium">
          {categorias.slice(0,6).map(c=> (
            <Link key={c.id} to={`/categoria/${encodeURIComponent(c.name)}`} className="hover:underline">{c.name}</Link>
          ))}
        </nav>

        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar productos..." className="input" />
            <button 
              onClick={()=>{ if(q) navigate('/'); alert('Buscar: '+q) }} 
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-pink-600 text-white"
            >
              <Search className="w-4 h-4"/>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/favoritos" className="relative">
            <Heart className="w-6 h-6 text-pink-600" />
            {favorites.length>0 && <span className="badge">{favorites.length}</span>}
          </Link>
          <Link to="/carrito" className="relative">
            <ShoppingCart className="w-6 h-6 text-pink-600" />
            {cart.length>0 && <span className="badge">{cart.length}</span>}
          </Link>
          {user ? (
            <>
              <span className="ml-2 text-pink-700">{user.name}</span>
              <button onClick={logout} className="ml-2 text-sm bg-pink-600 text-white px-2 py-1 rounded">
                Salir
              </button>
            </>
          ) : (
            <Link to="/login" className="ml-2 text-pink-700">Iniciar sesión</Link>
          )}
        </div>
      </div>
      <div className="bg-pink-100">
        <div className="max-w-6xl mx-auto px-4 py-2 text-sm text-pink-700">Estás en: Inicio</div>
      </div>
    </header>
  )
}
