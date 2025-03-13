import { ProductList, ProductCardSkeleton } from '../components/product-card'

export default async function Home() {
  const response = await fetch('http://localhost:8081/admin/postagens/');
  const data = await response.json();
  console.log(data)
  return (
    <main>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 px-4">Cardápio</h1>
        <ProductList products={data.postagens} />
      </div>
    </main>
  );
}
