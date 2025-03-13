'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductForm } from '@/components/product-form'

export default function NewDishPage() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    const categoria = searchParams.get('categoria')
    if (categoria) setSelectedCategory(categoria)
  }, [searchParams])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 px-4">Cadastro de Pratos</h1>
      <ProductForm initialCategory={selectedCategory} />
    </div>
  )
}