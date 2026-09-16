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
  const term = q.trim();
  const { data: products } = await getProducts(1, 50, undefined, term || undefined);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Breadcrumbs */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:underline">Início</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">Busca</span>
        </nav>

        <header className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="font-display font-black text-3xl md:text-4xl text-brand-dark mb-3">
            {q ? `Resultados para "${q}"` : "Buscar Produtos"}
          </h1>
          <p className="text-gray-500 text-base">
            {products.length > 0
              ? `Encontramos ${products.length} produto(s) incrível(is) para você.`
              : "Nenhum produto encontrado. Que tal tentar outros termos?"}
          </p>
        </header>

        {/* Search input form */}
        <form action="/busca" method="GET" className="max-w-2xl mx-auto mb-12 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 group">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Ex: Ração para cães, arame, vacinas..."
              className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 text-base bg-white shadow-sm transition-all"
            />
            <MagnifyingGlass size={22} weight="bold" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-forest transition-colors" />
          </div>
          <button
            type="submit"
            className="h-14 px-8 bg-brand-forest text-white font-bold text-base rounded-xl hover:bg-brand-forest-dark transition-all shadow-[0_4px_14px_rgba(34,139,34,0.3)] hover:shadow-[0_6px_20px_rgba(34,139,34,0.4)] active:scale-95"
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
          <div className="bg-white rounded-3xl p-16 text-center max-w-lg mx-auto border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <MagnifyingGlass size={48} weight="duotone" className="text-gray-300" />
            </div>
            <h3 className="font-display font-bold text-2xl text-brand-dark mb-3">Nenhum resultado</h3>
            <p className="text-base text-gray-500 mb-8 leading-relaxed">
              Não conseguimos encontrar nenhum produto com o termo <span className="font-bold text-gray-700">"{q}"</span>. Verifique a ortografia ou tente palavras mais genéricas.
            </p>
            <Link
              href="/produtos"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-forest text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-brand-forest-dark transition-all shadow-[0_4px_14px_rgba(34,139,34,0.3)] hover:shadow-[0_6px_20px_rgba(34,139,34,0.4)] active:scale-95"
            >
              Navegar no Catálogo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
