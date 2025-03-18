'use client'

import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartItems, cartTotal, removeFromCart } = useCart()

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary-600">
          RestauranteXPTO
        </Link>

        <div className="flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative text-gray-600 hover:text-primary-600"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {isCartOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border">
                <div className="p-4 max-h-96 overflow-y-auto">
                  <h3 className="text-lg font-bold mb-4">Seu Carrinho</h3>

                  {cartItems.length === 0 ? (
                    <p className="text-gray-500">Seu carrinho está vazio</p>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 py-3 border-b">
                          <img
                            src={'http://localhost:8081/' + item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm">
                              {item.quantity} × R${item.price.toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remover
                          </button>
                        </div>
                      ))}

                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between mb-4 font-bold">
                          <span>Total:</span>
                          <span>R${cartTotal.toFixed(2)}</span>
                        </div>
                        <Link
                          href="/carrinho"
                          className="block w-full text-center bg-green-600 text-white py-2 rounded hover:bg-primary-700"
                          onClick={() => setIsCartOpen(false)}
                        >
                          Ver Carrinho
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}