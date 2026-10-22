import { Suspense } from "react";
import { getCategories } from "@/lib/hiper/categories";
import Link from "next/link";

/**
 * Server component that renders the actual category links.
 * Wrapped in Suspense by CategoryNav so it doesn't block static rendering.
 */
async function CategoryNavLinks() {
  const categories = await getCategories();

  // Show first 6 categories max in the nav bar (they're already sorted by product count)
  const topCategories = categories.slice(0, 6);

  return (
    <ul className="flex items-center justify-center gap-6 lg:gap-8 h-11 overflow-x-auto">
      {topCategories.map(({ slug, name }) => (
        <li key={slug} className="flex-shrink-0">
          <Link
            href={`/categorias/${slug}`}
            className="text-sm font-semibold text-brand-dark hover:text-brand-forest transition-colors uppercase tracking-wide whitespace-nowrap"
          >
            {name}
          </Link>
        </li>
      ))}
      <li className="flex-shrink-0">
        <Link
          href="/categorias/ofertas"
          className="text-sm font-semibold text-brand-red hover:text-brand-red/80 transition-colors uppercase tracking-wide whitespace-nowrap"
        >
          🔥 Ofertas
        </Link>
      </li>
      <li className="flex-shrink-0">
        <Link
          href="/produtos"
          className="text-sm font-extrabold text-brand-forest hover:opacity-80 transition-opacity uppercase tracking-wide whitespace-nowrap"
        >
          Todos os Produtos
        </Link>
      </li>
    </ul>
  );
}

/**
 * Fallback nav shown while categories load (skeleton).
 */
function CategoryNavFallback() {
  return (
    <ul className="flex items-center justify-center gap-6 lg:gap-8 h-11">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="flex-shrink-0">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </li>
      ))}
      <li className="flex-shrink-0">
        <Link
          href="/categorias/ofertas"
          className="text-sm font-semibold text-brand-red hover:text-brand-red/80 transition-colors uppercase tracking-wide whitespace-nowrap"
        >
          🔥 Ofertas
        </Link>
      </li>
      <li className="flex-shrink-0">
        <Link
          href="/produtos"
          className="text-sm font-extrabold text-brand-forest hover:opacity-80 transition-opacity uppercase tracking-wide whitespace-nowrap"
        >
          Todos os Produtos
        </Link>
      </li>
    </ul>
  );
}

/**
 * Category navigation bar — uses Suspense so the layout
 * can still be statically generated while categories load dynamically.
 */
export function CategoryNav() {
  return (
    <nav className="hidden md:block border-t border-gray-100 bg-white sticky top-[calc(theme(spacing.20)+30px)] z-40">
      <div className="container mx-auto px-4">
        <Suspense fallback={<CategoryNavFallback />}>
          <CategoryNavLinks />
        </Suspense>
      </div>
    </nav>
  );
}
