'use client'

import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart, X } from 'lucide-react'

export default function CartPage() {
  const { cartItems, clearCart, cartTotal, removeFromCart } = useCart()

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <ShoppingCart className="h-8 w-8" />
        Seu Carrinho
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center space-y-4">
          <p className="text-gray-600 text-lg">Seu carrinho está vazio</p>
          <Link href="/">
            <Button className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Continuar Comprando
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Lista de Itens */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span>Quantidade: {item.quantity}</span>
                    <span>Preço: R${item.price.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit sticky top-4">
            <h2 className="text-xl font-bold mb-4">Resumo</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>R${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>R${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                className="w-full"
                onClick={clearCart}
                variant="destructive"
              >
                Limpar Carrinho
              </Button>
              <Link href="/checkout" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Finalizar Compra
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}