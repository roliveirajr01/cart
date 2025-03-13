'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary-600">
          RestauranteXPTO
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/categorias"
            className={`flex items-center gap-1 hover:text-primary-600 ${pathname.startsWith('/admin') ? 'text-primary-600' : 'text-gray-600'
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="hidden sm:inline">Novo Prato</span>
          </Link>

          <Link
            href="/carrinho"
            className="relative text-gray-600 hover:text-primary-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </Link>

          <div className="relative group">
            <button className="text-gray-600 hover:text-primary-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 hidden group-hover:block">
              <Link
                href="/conta"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Meus Dados
              </Link>
              <Link
                href="/pedidos"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Meus Pedidos
              </Link>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}