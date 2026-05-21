import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Admin from './AdminPanel'
import Favorite from './Favorite'
import Profile from './Profile'
import Cart from './Cart'
interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  image: string
  categoryId: number
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    fetch('http://localhost:5000/products/get')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id: number) => {
    console.log('app клик ', id)
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/favorites" element={
        <Favorite products={products} favorites={favorites} toggleFavorite={toggleFavorite} />
      } />
      <Route path="/profile" element={<Profile />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
  )
}

export default App