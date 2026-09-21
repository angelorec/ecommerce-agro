import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/hiper/categories";

const CATEGORY_ICONS: Record<string, string> = {
  pets: "/images/categories/pets.png",
  "grandes-animais": "/images/categories/cattle.png",
  avicola: "/images/categories/poultry.png",
  peixes: "/images/categories/pets.png",
};

export async function CategoryGrid() {
  const categories = await getCategories();

  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <h2 className="sr-only">Navegar por categorias</h2>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categorias/${category.slug}`}
              className="flex flex-col items-center gap-3 group w-[80px] sm:w-[110px]"
            >
              <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-gray-200 group-hover:border-brand-gold shadow-sm group-hover:shadow-md bg-gray-50 transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                <Image
                  src={CATEGORY_ICONS[category.slug] ?? "/images/categories/pets.png"}
                  alt={category.name}
                  fill
                  className="object-contain p-3"
                />
              </div>
              <span className="font-display font-bold text-xs sm:text-sm text-center text-brand-dark group-hover:text-brand-forest transition-colors">
                {category.name}
              </span>
            </Link>
          ))}

          {/* All Products — always shown */}
          <Link
            href="/produtos"
            className="flex flex-col items-center gap-3 group w-[80px] sm:w-[110px]"
          >
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-brand-forest/40 group-hover:border-brand-forest shadow-sm group-hover:shadow-md bg-brand-forest/5 transition-all duration-300 group-hover:-translate-y-2 flex items-center justify-center">
              <span className="text-4xl">🛍️</span>
            </div>
            <span className="font-display font-bold text-xs sm:text-sm text-center text-brand-forest group-hover:opacity-80 transition-opacity">
              Todos os Produtos
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
