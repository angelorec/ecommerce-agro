import { getProducts } from "@/lib/hiper/products";
import { getCategories } from "@/lib/hiper/categories";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { Faders, CaretDown, CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

const PRODUCTS_PER_PAGE = 20;

interface ProductsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const { data: products, total, totalPages } = await getProducts(currentPage, PRODUCTS_PER_PAGE);
  const categories = await getCategories();

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Generate visible page numbers (max 5 around current)
  const pageNumbers: number[] = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-forest transition-colors">Início</Link>
          <span>/</span>
          <span className="text-brand-dark font-medium">Todos os Produtos</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="font-display font-bold text-brand-dark uppercase tracking-wide">Filtros</h2>
                <Faders size={20} className="text-gray-400" />
              </div>

              <div className="space-y-6">
                {/* Categorias */}
                <div>
                  <h3 className="font-sans font-semibold text-sm mb-3">Categorias</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          href={`/categorias/${cat.slug}`}
                          className="flex items-center justify-between py-1 hover:text-brand-forest transition-colors"
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs text-gray-400 font-mono">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preço */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-sans font-semibold text-sm mb-3">Faixa de Preço</h3>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm" />
                    <span className="text-gray-400">-</span>
                    <input type="number" placeholder="Max" className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header / Sort */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h1 className="font-display font-bold text-xl text-brand-dark">
                Catálogo <span className="text-gray-400 text-sm font-sans font-normal ml-2">({total} produtos)</span>
              </h1>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Ordenar por:</span>
                <div className="relative border border-gray-200 rounded-md bg-gray-50 flex items-center px-3 py-1.5 cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="text-sm font-medium mr-2">Relevância</span>
                  <CaretDown size={14} />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  {/* Anterior */}
                  {hasPrev ? (
                    <Link
                      href={`/produtos?page=${currentPage - 1}`}
                      className="h-10 px-4 rounded-md border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center gap-1.5 text-sm font-medium text-brand-dark transition-colors"
                    >
                      <CaretLeft size={14} weight="bold" />
                      Anterior
                    </Link>
                  ) : (
                    <span className="h-10 px-4 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-300 cursor-not-allowed">
                      <CaretLeft size={14} weight="bold" />
                      Anterior
                    </span>
                  )}

                  {/* Page Numbers */}
                  {startPage > 1 && (
                    <>
                      <Link
                        href="/produtos?page=1"
                        className="w-10 h-10 rounded-md border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-sm font-medium text-brand-dark transition-colors"
                      >
                        1
                      </Link>
                      {startPage > 2 && (
                        <span className="w-8 h-10 flex items-center justify-center text-gray-400 text-sm">…</span>
                      )}
                    </>
                  )}

                  {pageNumbers.map((pageNum) => (
                    pageNum === currentPage ? (
                      <span
                        key={pageNum}
                        className="w-10 h-10 rounded-md bg-brand-forest text-white font-bold flex items-center justify-center text-sm"
                      >
                        {pageNum}
                      </span>
                    ) : (
                      <Link
                        key={pageNum}
                        href={`/produtos?page=${pageNum}`}
                        className="w-10 h-10 rounded-md border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-sm font-medium text-brand-dark transition-colors"
                      >
                        {pageNum}
                      </Link>
                    )
                  ))}

                  {endPage < totalPages && (
                    <>
                      {endPage < totalPages - 1 && (
                        <span className="w-8 h-10 flex items-center justify-center text-gray-400 text-sm">…</span>
                      )}
                      <Link
                        href={`/produtos?page=${totalPages}`}
                        className="w-10 h-10 rounded-md border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-sm font-medium text-brand-dark transition-colors"
                      >
                        {totalPages}
                      </Link>
                    </>
                  )}

                  {/* Próxima */}
                  {hasNext ? (
                    <Link
                      href={`/produtos?page=${currentPage + 1}`}
                      className="h-10 px-4 rounded-md border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center gap-1.5 text-sm font-medium text-brand-dark transition-colors"
                    >
                      Próxima
                      <CaretRight size={14} weight="bold" />
                    </Link>
                  ) : (
                    <span className="h-10 px-4 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-300 cursor-not-allowed">
                      Próxima
                      <CaretRight size={14} weight="bold" />
                    </span>
                  )}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

  const categories = await getCategories();

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-forest transition-colors">Início</Link>
          <span>/</span>
          <span className="text-brand-dark font-medium">Todos os Produtos</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="font-display font-bold text-brand-dark uppercase tracking-wide">Filtros</h2>
                <Faders size={20} className="text-gray-400" />
              </div>

              <div className="space-y-6">
                {/* Categorias */}
                <div>
                  <h3 className="font-sans font-semibold text-sm mb-3">Categorias</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          href={`/categorias/${cat.slug}`}
                          className="flex items-center justify-between py-1 hover:text-brand-forest transition-colors"
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs text-gray-400 font-mono">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preço */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-sans font-semibold text-sm mb-3">Faixa de Preço</h3>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm" />
                    <span className="text-gray-400">-</span>
                    <input type="number" placeholder="Max" className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header / Sort */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h1 className="font-display font-bold text-xl text-brand-dark">
                Catálogo <span className="text-gray-400 text-sm font-sans font-normal ml-2">({total} produtos)</span>
              </h1>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Ordenar por:</span>
                <div className="relative border border-gray-200 rounded-md bg-gray-50 flex items-center px-3 py-1.5 cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="text-sm font-medium mr-2">Relevância</span>
                  <CaretDown size={14} />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {total > 20 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 cursor-not-allowed">
                    Anterior
                  </button>
                  <button className="w-10 h-10 rounded-md bg-brand-forest text-white font-bold flex items-center justify-center">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-md border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-brand-dark font-medium transition-colors">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-md border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-brand-dark transition-colors">
                    Próxima
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
