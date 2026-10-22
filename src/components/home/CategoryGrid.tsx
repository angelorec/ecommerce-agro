import Link from "next/link";
import { getCategories } from "@/lib/hiper/categories";
import {
  Dog, Cat, Bathtub, Bone, Storefront, Pill, Cookie,
  PawPrint, GameController, Fish, Bird, Basket,
  Drop, Egg
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react/dist/lib/types";

/**
 * Icon mapping by slug — covers all HIPER categories.
 */
const CATEGORY_ICONS: Record<string, Icon> = {
  // Pets
  "racoes-cao": Dog,
  "racoes-gato": Cat,
  "petiscos": Cookie,
  "acessorios-brinquedos": GameController,
  "higiene-banho": Bathtub,
  "vermifugos": Pill,
  // Pássaros
  "passaros": Bird,
  "gaiolas": Basket,
  "passaros-on": Bird,
  // Peixes
  "peixes": Fish,
  // Avícola
  "racoes-avicola": Egg,
};

/**
 * Color mapping by slug — gradient backgrounds and icon colors.
 */
const CATEGORY_STYLES: Record<string, { bg: string; icon: string }> = {
  "racoes-cao":             { bg: "from-blue-50 to-indigo-50 border-blue-200 group-hover:border-blue-400",          icon: "text-blue-500 group-hover:text-blue-600" },
  "racoes-gato":            { bg: "from-purple-50 to-pink-50 border-purple-200 group-hover:border-purple-400",      icon: "text-purple-500 group-hover:text-purple-600" },
  "petiscos":               { bg: "from-amber-50 to-yellow-50 border-amber-200 group-hover:border-amber-400",       icon: "text-amber-500 group-hover:text-amber-600" },
  "acessorios-brinquedos":  { bg: "from-rose-50 to-orange-50 border-rose-200 group-hover:border-rose-400",          icon: "text-rose-500 group-hover:text-rose-600" },
  "higiene-banho":          { bg: "from-cyan-50 to-teal-50 border-cyan-200 group-hover:border-cyan-400",            icon: "text-cyan-500 group-hover:text-cyan-600" },
  "vermifugos":             { bg: "from-red-50 to-rose-50 border-red-200 group-hover:border-red-400",               icon: "text-red-500 group-hover:text-red-600" },
  "passaros":               { bg: "from-lime-50 to-green-50 border-lime-200 group-hover:border-lime-400",           icon: "text-lime-600 group-hover:text-lime-700" },
  "gaiolas":                { bg: "from-emerald-50 to-green-50 border-emerald-200 group-hover:border-emerald-400",  icon: "text-emerald-500 group-hover:text-emerald-600" },
  "passaros-on":            { bg: "from-teal-50 to-emerald-50 border-teal-200 group-hover:border-teal-400",         icon: "text-teal-500 group-hover:text-teal-600" },
  "peixes":                 { bg: "from-sky-50 to-blue-50 border-sky-200 group-hover:border-sky-400",               icon: "text-sky-500 group-hover:text-sky-600" },
  "racoes-avicola":         { bg: "from-orange-50 to-amber-50 border-orange-200 group-hover:border-orange-400",     icon: "text-orange-500 group-hover:text-orange-600" },
};

const DEFAULT_STYLE = {
  bg: "from-gray-50 to-slate-50 border-gray-200 group-hover:border-gray-400",
  icon: "text-gray-500 group-hover:text-gray-600",
};

/**
 * Group labels for parent categories — shown as section headers.
 */
const GROUP_LABELS: Record<string, { emoji: string; label: string }> = {
  pets:     { emoji: "🐾", label: "Pets" },
  passaros: { emoji: "🐦", label: "Pássaros" },
};

export async function CategoryGrid() {
  const categories = await getCategories();

  // Group categories by parent
  const pets = categories.filter(c => c.parentId === 'pets');
  const passaros = categories.filter(c => c.parentId === 'passaros');
  const standalone = categories.filter(c => !c.parentId && c.slug !== 'pets' && c.slug !== 'passaros');

  const groups = [
    { key: 'pets', items: pets, ...GROUP_LABELS.pets },
    { key: 'passaros', items: passaros, ...GROUP_LABELS.passaros },
  ].filter(g => g.items.length > 0);

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="text-center mb-10">
          <h2 className="font-display font-black text-2xl md:text-3xl text-brand-dark tracking-tight">
            Navegue por <span className="text-brand-forest">Categoria</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">Encontre tudo para seus animais com facilidade</p>
        </div>

        <div className="space-y-10">
          {/* Grouped categories (Pets, Pássaros) */}
          {groups.map(({ key, items, emoji, label }) => (
            <div key={key}>
              <div className="flex items-center justify-center gap-2 mb-5">
                <span className="text-lg">{emoji}</span>
                <h3 className="font-display font-bold text-lg text-brand-dark uppercase tracking-wide">{label}</h3>
                <div className="hidden sm:block h-px bg-gray-200 flex-1 max-w-[100px] ml-2" />
              </div>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {items.map((category) => (
                  <CategoryTile key={category.id} category={category} />
                ))}
              </div>
            </div>
          ))}

          {/* Standalone categories (Peixes, Avícola, Vermífugos) */}
          {standalone.length > 0 && (
            <div>
              <div className="flex items-center justify-center gap-2 mb-5">
                <span className="text-lg">🏪</span>
                <h3 className="font-display font-bold text-lg text-brand-dark uppercase tracking-wide">Outros</h3>
                <div className="hidden sm:block h-px bg-gray-200 flex-1 max-w-[100px] ml-2" />
              </div>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {standalone.map((category) => (
                  <CategoryTile key={category.id} category={category} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ver Tudo */}
        <div className="flex justify-center mt-10">
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-forest text-white font-bold text-sm uppercase tracking-wider hover:bg-brand-forest-dark transition-all shadow-[0_4px_14px_rgba(34,139,34,0.3)] hover:shadow-[0_6px_20px_rgba(34,139,34,0.4)] active:scale-95"
          >
            <Storefront size={20} weight="duotone" />
            Ver Todos os Produtos
          </Link>
        </div>
      </div>
    </section>
  );
}

function CategoryTile({ category }: { category: { id: string; name: string; slug: string } }) {
  const IconComponent = CATEGORY_ICONS[category.slug] ?? PawPrint;
  const style = CATEGORY_STYLES[category.slug] ?? DEFAULT_STYLE;

  return (
    <Link
      href={`/categorias/${category.slug}`}
      className="flex flex-col items-center gap-3 group w-[90px] sm:w-[110px]"
    >
      <div className={`relative w-18 h-18 sm:w-22 sm:h-22 rounded-2xl border-2 bg-gradient-to-br ${style.bg} shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2 overflow-hidden flex items-center justify-center`}>
        <IconComponent size={36} weight="duotone" className={`${style.icon} transition-colors duration-300`} />
      </div>
      <span className="font-display font-bold text-[11px] sm:text-xs text-center text-brand-dark group-hover:text-brand-forest transition-colors leading-tight">
        {category.name}
      </span>
    </Link>
  );
}
