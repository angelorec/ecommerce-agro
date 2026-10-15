import Link from "next/link";
import { getCategories } from "@/lib/hiper/categories";
import { Dog, Cat, Bathtub, Bone, Storefront } from "@phosphor-icons/react/dist/ssr";

const CATEGORY_ICONS: Record<string, typeof Dog> = {
  pets: Dog,
  caes: Dog,
  gatos: Cat,
  "higiene-pet": Bathtub,
  "acessorios-pet": Bone,
};

const CATEGORY_COLORS: Record<string, string> = {
  pets: "from-amber-50 to-orange-50 border-amber-200 group-hover:border-brand-gold",
  caes: "from-blue-50 to-indigo-50 border-blue-200 group-hover:border-blue-400",
  gatos: "from-purple-50 to-pink-50 border-purple-200 group-hover:border-purple-400",
  "higiene-pet": "from-cyan-50 to-teal-50 border-cyan-200 group-hover:border-cyan-400",
  "acessorios-pet": "from-rose-50 to-red-50 border-rose-200 group-hover:border-rose-400",
};

const CATEGORY_ICON_COLORS: Record<string, string> = {
  pets: "text-amber-500 group-hover:text-brand-gold",
  caes: "text-blue-500 group-hover:text-blue-600",
  gatos: "text-purple-500 group-hover:text-purple-600",
  "higiene-pet": "text-cyan-500 group-hover:text-cyan-600",
  "acessorios-pet": "text-rose-500 group-hover:text-rose-600",
};

export async function CategoryGrid() {
  const categories = await getCategories();

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="text-center mb-8">
          <h2 className="font-display font-black text-2xl md:text-3xl text-brand-dark tracking-tight">
            Navegue por <span className="text-brand-forest">Categoria</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">Encontre tudo para o seu pet com facilidade</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category) => {
            const IconComponent = CATEGORY_ICONS[category.slug] ?? Dog;
            const colorClass = CATEGORY_COLORS[category.slug] ?? CATEGORY_COLORS.pets;
            const iconColor = CATEGORY_ICON_COLORS[category.slug] ?? CATEGORY_ICON_COLORS.pets;
            
            return (
              <Link
                key={category.id}
                href={`/categorias/${category.slug}`}
                className="flex flex-col items-center gap-3 group w-[90px] sm:w-[120px]"
              >
                <div className={`relative w-18 h-18 sm:w-24 sm:h-24 rounded-2xl border-2 bg-gradient-to-br ${colorClass} shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2 overflow-hidden flex items-center justify-center`}>
                  <IconComponent size={40} weight="duotone" className={`${iconColor} transition-colors duration-300`} />
                </div>
                <span className="font-display font-bold text-xs sm:text-sm text-center text-brand-dark group-hover:text-brand-forest transition-colors">
                  {category.name}
                </span>
              </Link>
            );
          })}

          {/* All Products — always shown */}
          <Link
            href="/produtos"
            className="flex flex-col items-center gap-3 group w-[90px] sm:w-[120px]"
          >
            <div className="relative w-18 h-18 sm:w-24 sm:h-24 rounded-2xl border-2 border-brand-forest/30 group-hover:border-brand-forest shadow-sm group-hover:shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 transition-all duration-300 group-hover:-translate-y-2 flex items-center justify-center">
              <Storefront size={40} weight="duotone" className="text-brand-forest transition-colors duration-300" />
            </div>
            <span className="font-display font-bold text-xs sm:text-sm text-center text-brand-forest group-hover:opacity-80 transition-opacity">
              Ver Tudo
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
