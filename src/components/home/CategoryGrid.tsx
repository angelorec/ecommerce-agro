import Link from "next/link";
import { getCategories } from "@/lib/hiper/categories";
import {
  Dog, Cat, Bathtub, Bone, Storefront, Pill, Cookie,
  PawPrint, Tote, GameController, House as HouseIcon, FirstAid,
  Drop, CaretCircleRight
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react/dist/lib/types";

/**
 * Icon mapping by slug — covers all known PETS sub-categories.
 * Falls back to PawPrint for unknown slugs.
 */
const CATEGORY_ICONS: Record<string, Icon> = {
  "racao-caes": Dog,
  "racao-gatos": Cat,
  "petiscos-caes": Cookie,
  "petiscos-gatos": Cookie,
  "areia-gatos": Drop,
  "higiene-pet": Bathtub,
  "farmacia-pet": Pill,
  "antipulgas": FirstAid,
  "acessorios-pet": Bone,
  "coleiras-guias": PawPrint,
  "brinquedos-pet": GameController,
  "camas-casas": HouseIcon,
  "comedouros-bebedouros": Tote,
  "tapetes-higienicos": Bathtub,
  "transporte-pet": Tote,
};

/**
 * Color mapping by slug — gradient backgrounds and icon colors.
 * Uses a deterministic assignment for unknown slugs.
 */
const CATEGORY_STYLES: Record<string, { bg: string; icon: string }> = {
  "racao-caes":             { bg: "from-blue-50 to-indigo-50 border-blue-200 group-hover:border-blue-400",          icon: "text-blue-500 group-hover:text-blue-600" },
  "racao-gatos":            { bg: "from-purple-50 to-pink-50 border-purple-200 group-hover:border-purple-400",      icon: "text-purple-500 group-hover:text-purple-600" },
  "petiscos-caes":          { bg: "from-amber-50 to-yellow-50 border-amber-200 group-hover:border-amber-400",       icon: "text-amber-500 group-hover:text-amber-600" },
  "petiscos-gatos":         { bg: "from-fuchsia-50 to-pink-50 border-fuchsia-200 group-hover:border-fuchsia-400",   icon: "text-fuchsia-500 group-hover:text-fuchsia-600" },
  "areia-gatos":            { bg: "from-stone-50 to-amber-50 border-stone-200 group-hover:border-stone-400",        icon: "text-stone-500 group-hover:text-stone-600" },
  "higiene-pet":            { bg: "from-cyan-50 to-teal-50 border-cyan-200 group-hover:border-cyan-400",            icon: "text-cyan-500 group-hover:text-cyan-600" },
  "farmacia-pet":           { bg: "from-red-50 to-rose-50 border-red-200 group-hover:border-red-400",               icon: "text-red-500 group-hover:text-red-600" },
  "antipulgas":             { bg: "from-lime-50 to-green-50 border-lime-200 group-hover:border-lime-400",           icon: "text-lime-600 group-hover:text-lime-700" },
  "acessorios-pet":         { bg: "from-rose-50 to-orange-50 border-rose-200 group-hover:border-rose-400",          icon: "text-rose-500 group-hover:text-rose-600" },
  "coleiras-guias":         { bg: "from-orange-50 to-amber-50 border-orange-200 group-hover:border-orange-400",     icon: "text-orange-500 group-hover:text-orange-600" },
  "brinquedos-pet":         { bg: "from-violet-50 to-indigo-50 border-violet-200 group-hover:border-violet-400",    icon: "text-violet-500 group-hover:text-violet-600" },
  "camas-casas":            { bg: "from-sky-50 to-blue-50 border-sky-200 group-hover:border-sky-400",               icon: "text-sky-500 group-hover:text-sky-600" },
  "comedouros-bebedouros":  { bg: "from-teal-50 to-emerald-50 border-teal-200 group-hover:border-teal-400",         icon: "text-teal-500 group-hover:text-teal-600" },
  "tapetes-higienicos":     { bg: "from-emerald-50 to-green-50 border-emerald-200 group-hover:border-emerald-400",  icon: "text-emerald-500 group-hover:text-emerald-600" },
  "transporte-pet":         { bg: "from-slate-50 to-gray-50 border-slate-200 group-hover:border-slate-400",         icon: "text-slate-500 group-hover:text-slate-600" },
};

const DEFAULT_STYLE = { bg: "from-amber-50 to-orange-50 border-amber-200 group-hover:border-brand-gold", icon: "text-amber-500 group-hover:text-brand-gold" };

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
            const IconComponent = CATEGORY_ICONS[category.slug] ?? PawPrint;
            const style = CATEGORY_STYLES[category.slug] ?? DEFAULT_STYLE;
            
            return (
              <Link
                key={category.id}
                href={`/categorias/${category.slug}`}
                className="flex flex-col items-center gap-3 group w-[90px] sm:w-[120px]"
              >
                <div className={`relative w-18 h-18 sm:w-24 sm:h-24 rounded-2xl border-2 bg-gradient-to-br ${style.bg} shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2 overflow-hidden flex items-center justify-center`}>
                  <IconComponent size={40} weight="duotone" className={`${style.icon} transition-colors duration-300`} />
                </div>
                <span className="font-display font-bold text-xs sm:text-sm text-center text-brand-dark group-hover:text-brand-forest transition-colors leading-tight">
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
