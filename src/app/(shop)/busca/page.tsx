import { getProducts } from "@/lib/hiper/products";
import { getCategories } from "@/lib/hiper/categories";
import { HiperProduct } from "@/lib/hiper/types";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { MagnifyingGlass, Tag } from "@phosphor-icons/react/dist/ssr";

interface Props {
  searchParams: Promise<{ q?: string; categoria?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", categoria } = await searchParams;
  const term = q.trim();
  const { data: products } = await getProducts(1, 100, categoria || undefined, term || undefined);
  const categories = await getCategories();

  // Popular search suggestions
  const suggestions = [
    "Ração cão", "Ração gato", "Petiscos", "Shampoo pet",
    "Coleira", "Gaiola", "Ração pássaro", "Vermífugo",
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Breadcrumbs */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:underline">Início</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">Busca</span>
        </nav>

        <header className="mb-8 text-center max-w-2xl mx-auto">
          <h1 className="font-display font-black text-3xl md:text-4xl text-brand-dark mb-3">
            {term ? `Resultados para "${term}"` : categoria ? `Categoria: ${categoria}` : "Buscar Produtos"}
          </h1>
          <p className="text-gray-500 text-base">
            {products.length > 0
              ? `Encontramos ${products.length} produto(s) para você.`
              : "Nenhum produto encontrado. Que tal tentar outros termos?"}
          </p>
        </header>

        {/* Search input form */}
        <form action="/busca" method="GET" className="max-w-2xl mx-auto mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 group">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Buscar ração, acessório, gaiola, vermífugo..."
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

        {/* Quick search suggestions */}
        {!term && !categoria && (
          <div className="max-w-2xl mx-auto mb-10 text-center">
            <p className="text-sm text-gray-400 mb-3">Sugestões populares:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((s) => (
                <Link
                  key={s}
                  href={`/busca?q=${encodeURIComponent(s)}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-brand-forest hover:text-brand-forest transition-colors"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Category filter pills */}
        {(term || categoria) && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Tag size={16} className="text-gray-400 flex-shrink-0" />
              <Link
                href={term ? `/busca?q=${encodeURIComponent(term)}` : "/busca"}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  !categoria ? "bg-brand-forest text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-brand-forest"
                }`}
              >
                Todas
              </Link>
              {categories.slice(0, 10).map((cat) => (
                <Link
                  key={cat.slug}
                  href={term ? `/busca?q=${encodeURIComponent(term)}&categoria=${cat.slug}` : `/busca?categoria=${cat.slug}`}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    categoria === cat.slug ? "bg-brand-forest text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-brand-forest"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Results Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {products.map((product: HiperProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 md:p-16 text-center max-w-lg mx-auto border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <MagnifyingGlass size={48} weight="duotone" className="text-gray-300" />
            </div>
            <h3 className="font-display font-bold text-2xl text-brand-dark mb-3">Nenhum resultado</h3>
            <p className="text-base text-gray-500 mb-6 leading-relaxed">
              {term
                ? <>Não encontramos produtos com <span className="font-bold text-gray-700">&quot;{term}&quot;</span>. Tente outra palavra ou navegue por categoria.</>
                : "Nenhum produto nesta categoria. Tente outra ou veja todos os produtos."
              }
            </p>

            {/* Category suggestions */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categorias/${cat.slug}`}
                  className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-brand-forest hover:text-brand-forest transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <Link
              href="/produtos"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-forest text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-brand-forest-dark transition-all shadow-[0_4px_14px_rgba(34,139,34,0.3)] hover:shadow-[0_6px_20px_rgba(34,139,34,0.4)] active:scale-95"
            >
              Ver Todos os Produtos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
