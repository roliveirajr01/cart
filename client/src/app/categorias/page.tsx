'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Category {
  _id: string
  nome: string
  slug: string
}

export default function CategoryPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategory, setNewCategory] = useState({ nome: '', slug: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('http://localhost:8081/admin/categorias')
        const data = await response.json()
        setCategories(data.categorias)
      } catch (err) {
        setError('Falha ao carregar categorias')
      }
    }
    loadCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:8081/admin/categorias/nova', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      })

      if (!response.ok) throw new Error('Falha ao criar categoria')

      const createdCategory = await response.json()

      router.push(`/novo-prato?categoria=${createdCategory._id}`)

    } catch (err) {
      setError(err.message || 'Erro ao cadastrar categoria')
    } finally {
      setLoading(false)
    }
  }


  const handleNameChange = (nome: string) => {
    const slug = nome
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
    setNewCategory({ nome, slug })
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Selecione ou Crie uma Categoria</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Categorias Existentes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/admin/novo-prato?categoria=${cat._id}`}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium">{cat.nome}</h3>
                <p className="text-sm text-gray-500">{cat.slug}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Criar Nova Categoria</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome da Categoria *</label>
              <input
                type="text"
                value={newCategory.nome}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Slug *</label>
              <input
                type="text"
                value={newCategory.slug}
                onChange={(e) => setNewCategory(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg disabled:bg-gray-400"
            >
              {loading ? 'Salvando...' : 'Criar Categoria e Continuar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}