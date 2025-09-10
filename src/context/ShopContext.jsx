import { createContext, useEffect, useState } from 'react'
export const ShopContext = createContext()

const LS_CART = 'tienda_cart_v1'
const LS_FAV = 'tienda_fav_v1'
const LS_USER = 'tienda_user_v1'
const LS_USERS = 'tienda_users_v1' // lista de usuarios registrados

export function ShopProvider({ children }){
  const [cart, setCart] = useState(() => {
    try{ return JSON.parse(localStorage.getItem(LS_CART)) || [] }catch{ return [] }
  })
  const [favorites, setFavorites] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem(LS_FAV)) || [] }catch{ return [] }
  })
  const [user, setUser] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem(LS_USER)) || null }catch{ return null }
  })
  const [users, setUsers] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem(LS_USERS)) || [] }catch{ return [] }
  })

  // Guardar en localStorage cuando cambian
  useEffect(()=>{ localStorage.setItem(LS_CART, JSON.stringify(cart)) },[cart])
  useEffect(()=>{ localStorage.setItem(LS_FAV, JSON.stringify(favorites)) },[favorites])
  useEffect(()=>{ localStorage.setItem(LS_USER, JSON.stringify(user)) },[user])
  useEffect(()=>{ localStorage.setItem(LS_USERS, JSON.stringify(users)) },[users])

  // Carrito
  const addToCart = (p)=> setCart(prev => [...prev, p])
  const removeFromCartByIndex = (i)=> setCart(prev => prev.filter((_,idx)=>idx!==i))
  const clearCart = ()=> setCart([])

  // Favoritos
  const toggleFavorite = (id)=> setFavorites(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id])

  // Registro
  const register = (name, email, password)=>{
    if(users.some(u=>u.email===email)) return false // ya existe
    const newUser = { name, email, password }
    setUsers(prev=>[...prev,newUser])
    setUser({ name, email }) // lo logueamos al registrarse
    return true
  }

  // Login
  const login = (email, password)=>{
    const found = users.find(u=>u.email===email && u.password===password)
    if(found){
      setUser({ name: found.name, email: found.email })
      return true
    }
    return false
  }

  // Logout
  const logout = ()=> setUser(null)

  return (
    <ShopContext.Provider value={{ 
      cart, setCart, favorites, addToCart, toggleFavorite, 
      removeFromCartByIndex, clearCart, 
      user, login, logout, register 
    }}>
      {children}
    </ShopContext.Provider>
  )
}

