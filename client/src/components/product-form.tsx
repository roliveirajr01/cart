'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ProductCard, Product } from './product-card'

const initialProductState: Product = {
  id: '',
  image: '',
  title: '',
  price: 0,
  description: '',
  category: '',
  isVegetarian: false,
  isGlutenFree: false,
  rating: 0
}

export function ProductForm({ initialCategory = '' }) {
  const [product, setProduct] = useState<Product>({
    ...initialProductState,
    category: initialCategory
  })
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)


  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg']
    },
    maxSize: 5 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      setFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
        setProduct(prev => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setProduct(prev => ({ ...prev, [name]: val }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()

      formData.append('titulo', product.title)
      formData.append('slug', product.title.toLowerCase().replace(/\s+/g, '-'))
      formData.append('descricao', product.description)
      formData.append('conteudo', product.description)
      formData.append('categoria', '67bf42127604775f9534e726')
      formData.append('preco', product.price.toString())
      formData.append('isVegetariano', product.isVegetarian.toString())
      formData.append('isSemGluten', product.isGlutenFree.toString())
      formData.append('avaliacao', product.rating?.toString() || '0')

      if (file) {
        formData.append('imagem', file)
      }

      console.log('formData', formData)

      const response = await fetch('http://localhost:8081/admin/prato/novo', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Falha ao cadastrar prato')
      }

      setProduct(initialProductState)
      setPreview(null)
      setFile(null)
      alert('Prato cadastrado com sucesso!')

    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao cadastrar prato: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">Cadastrar Novo Prato</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2">Imagem do Prato *</label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 transition-colors"
            >
              <input {...getInputProps()} />
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-32 w-full object-cover rounded-lg"
                />
              ) : (
                <div>
                  <p className="text-gray-500">
                    Arraste a imagem ou clique para selecionar
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Formatos: JPEG, PNG (Tamanho máximo: 5MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Título do Prato *</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Preço (R$) *</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={product.price || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Categoria *</label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Selecione</option>
                <option value="entradas">Entradas</option>
                <option value="pratos-principais">Pratos Principais</option>
                <option value="sobremesas">Sobremesas</option>
                <option value="bebidas">Bebidas</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição *</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg h-32"
              maxLength={200}
              required
            />
            <span className="text-sm text-gray-500 block text-right">
              {product.description.length}/200 caracteres
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isVegetarian"
                checked={product.isVegetarian}
                onChange={handleChange}
                className="form-checkbox h-4 w-4"
              />
              <span className="text-sm">Vegetariano</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isGlutenFree"
                checked={product.isGlutenFree}
                onChange={handleChange}
                className="form-checkbox h-4 w-4"
              />
              <span className="text-sm">Sem Glúten</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Avaliação (0-5)</label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={product.rating || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-semibold disabled:bg-gray-400"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Prato'}
          </button>
        </form>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl sticky top-4">
        <h3 className="text-lg font-semibold mb-4">Pré-visualização</h3>
        <div className="max-w-md mx-auto">
          <ProductCard product={{
            ...product,
            image: preview || '/dishes/placeholder.jpg',
            price: Number(product.price),
            rating: Number(product.rating)
          }} />
        </div>
      </div>
    </div>
  )
}