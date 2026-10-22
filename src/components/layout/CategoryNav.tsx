import { Suspense } from "react";
import { getCategories } from "@/lib/hiper/categories";
import Link from "next/link";

/**
 * Server component that renders the actual category links.
 * Wrapped in Suspense by CategoryNav so it doesn't block static rendering.
 */
async function CategoryNavLinks() {
  const categories = await getCategories();

  // Show top categories in the nav bar (sorted by display order from getCategories)
  // Group into: PETS subs, then others — max ~8 items
  const petsCategories = categories.filter(c => c.parentId === 'pets').slice(0, 5);
  const otherCategories = categories.filter(c => !c.parentId && c.slug !== 'pets').slice(0, 3);
  const topCategories = [...petsCategories, ...otherCategories];

  return (
    <ul className="flex items-center justify-center gap-4 lg:gap-6 h-11 overflow-x-auto scrollbar-hide">
      {topCategories.map(({ slug, name }) => (
        <li key={slug} className="flex-shrink-0">
          <Link
            href={`/categorias/${slug}`}
            className="text-[13px] font-semibold text-brand-dark hover:text-brand-forest transition-colors uppercase tracking-wide whitespace-nowrap"
          >
            {name}
          </Link>
        </li>
      ))}
      <li className="flex-shrink-0">
        <Link
          href="/categorias/ofertas"
          className="text-[13px] font-semibold text-brand-red hover:text-brand-red/80 transition-colors uppercase tracking-wide whitespace-nowrap"
        >
          🔥 Ofertas
        </Link>
      </li>
      <li className="flex-shrink-0">
        <Link
          href="/produtos"
          className="text-[13px] font-extrabold text-brand-forest hover:opacity-80 transition-opacity uppercase tracking-wide whitespace-nowrap"
        >
          Ver Tudo
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
    <ul className="flex items-center justify-center gap-4 lg:gap-6 h-11">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="flex-shrink-0">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </li>
      ))}
      <li className="flex-shrink-0">
        <Link
          href="/categorias/ofertas"
          className="text-[13px] font-semibold text-brand-red uppercase tracking-wide whitespace-nowrap"
        >
          🔥 Ofertas
        </Link>
      </li>
      <li className="flex-shrink-0">
        <Link
          href="/produtos"
          className="text-[13px] font-extrabold text-brand-forest uppercase tracking-wide whitespace-nowrap"
        >
          Ver Tudo
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
