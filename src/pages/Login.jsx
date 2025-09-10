import { useState, useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const { login } = useContext(ShopContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const ok = login(email, password)
    if(ok){
      navigate("/") // redirigir a inicio
    } else {
      setError("Correo o contraseña incorrectos")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Iniciar sesión</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="input w-full"
            required
          />
          <input 
            type="password" 
            value={password}
            onChange={e=>setPassword(e.target.value)}
            placeholder="Contraseña"
            className="input w-full"
            required
          />
          <button type="submit" className="btn w-full bg-pink-600 text-white">
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          ¿No tienes cuenta? <Link to="/register" className="text-pink-600 hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}
