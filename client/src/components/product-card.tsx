'use client'

export interface Product {
  _id: string
  titulo: string
  preco: number
  descricao: string
  categoria: {
    _id: string
    nome: string
  }
  imagem: string
  isVegetariano?: boolean
  isSemGluten?: boolean
  avaliacao?: number
  slug: string
  data: string
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full">
      <div className="relative aspect-square bg-gray-100">
        <img
          src={'http://localhost:8081' + product.imagem || '/dishes/placeholder.jpg'}
          alt={product.titulo}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        <div className="absolute top-2 left-2 flex gap-2">
          {product.isVegetariano && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
              🌱 Vegetariano
            </span>
          )}
          {product.isSemGluten && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
              🌾 Sem glúten
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-sm text-gray-500 mb-1">
          {product.categoria?.nome || 'Sem categoria'}
        </span>

        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-lg font-semibold truncate flex-1">
            {product.titulo}
          </h3>
          <span className="text-lg font-bold text-primary-600 whitespace-nowrap">
            {product.preco?.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }) || 'Preço não informado'}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.descricao}
        </p>

        {product.avaliacao && (
          <div className="flex items-center mt-auto mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(product.avaliacao!)
                    ? 'fill-current'
                    : 'fill-transparent'
                    }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.avaliacao?.toFixed(1)})
            </span>
          </div>
        )}

        <button className="mt-2 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar
        </button>
      </div>
    </div>
  )
}

export function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        product.imagem && <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-10 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  )
}