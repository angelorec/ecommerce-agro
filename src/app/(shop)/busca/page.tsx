import { getProducts } from "@/lib/hiper/products";
import { HiperProduct } from "@/lib/hiper/types";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const { data: allProducts } = await getProducts(1, 50);

  const term = q.trim().toLowerCase();
  const products: HiperProduct[] = term
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.categoryName.toLowerCase().includes(term) ||
          p.brand?.toLowerCase().includes(term)
      )
    : allProducts;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Breadcrumbs */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:underline">Início</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">Busca</span>
        </nav>

        <header className="mb-8">
          <h1 className="font-display font-black text-2xl md:text-3xl text-brand-dark mb-2">
            {q ? `Resultados para "${q}"` : "Buscar Produtos"}
          </h1>
          <p className="text-gray-600 text-sm">
            {products.length > 0
              ? `Encontramos ${products.length} produto(s) para sua busca.`
              : "Nenhum produto encontrado. Tente buscar com outros termos."}
          </p>
        </header>

        {/* Search input form */}
        <form action="/busca" method="GET" className="max-w-xl mb-8 flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Digite o nome do produto, ração, medicamento..."
              className="w-full h-12 pl-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-forest focus:ring-1 focus:ring-brand-forest text-sm bg-white"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-forest hover:bg-gray-100 rounded-md"
            >
              <MagnifyingGlass size={20} weight="bold" />
            </button>
          </div>
          <button
            type="submit"
            className="h-12 px-6 bg-brand-forest text-white font-bold text-sm rounded-lg hover:bg-brand-forest-light transition-colors"
          >
            Buscar
          </button>
        </form>

        {/* Results Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product: HiperProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center max-w-md mx-auto border border-gray-100 shadow-sm">
            <MagnifyingGlass size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="font-bold text-lg text-brand-dark mb-2">Nenhum resultado encontrado</h3>
            <p className="text-sm text-gray-500 mb-6">
              Verifique se digitou corretamente ou tente buscar por termos mais genéricos.
            </p>
            <Link
              href="/produtos"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-forest text-white font-bold text-sm rounded-xl hover:bg-brand-forest-light transition-colors"
            >
              Ver todos os produtos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
