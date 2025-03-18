'use client'

import { useEffect, useState } from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    try {
      if (savedCart) setCartItems(JSON.parse(savedCart))
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error)
      localStorage.removeItem('cart')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      return existing
        ? prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }

  const clearCart = () => setCartItems([])

  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  )

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal
  }
}