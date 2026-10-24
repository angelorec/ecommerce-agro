"use client";

import { useState } from "react";
import Link from "next/link";
import { HiperProduct } from "@/lib/hiper/types";
import { ProductCard } from "@/components/product/ProductCard";
import { 
  Dog, Cat, Bathtub, Cookie, GameController, PawPrint 
} from "@phosphor-icons/react";

interface SubCategory {
  slug: string;
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const PETS_SUBCATEGORIES: SubCategory[] = [
  { slug: "acessorios-brinquedos", name: "Acessórios",       icon: GameController, color: "text-rose-500",   bgColor: "bg-rose-50 border-rose-200 hover:border-rose-400" },
  { slug: "higiene-banho",         name: "Higiene & Banho",   icon: Bathtub,        color: "text-cyan-500",   bgColor: "bg-cyan-50 border-cyan-200 hover:border-cyan-400" },
  { slug: "petiscos",              name: "Petiscos",          icon: Cookie,         color: "text-amber-500",  bgColor: "bg-amber-50 border-amber-200 hover:border-amber-400" },
  { slug: "racoes-cao",            name: "Rações de Cães",    icon: Dog,            color: "text-blue-500",   bgColor: "bg-blue-50 border-blue-200 hover:border-blue-400" },
  { slug: "racoes-gato",           name: "Rações de Gato",    icon: Cat,            color: "text-purple-500", bgColor: "bg-purple-50 border-purple-200 hover:border-purple-400" },
];

interface PetsCategoryClientProps {
  allProducts: HiperProduct[];
  productsBySubcategory: Record<string, HiperProduct[]>;
}

export function PetsCategoryClient({ allProducts, productsBySubcategory }: PetsCategoryClientProps) {
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  const displayProducts = activeSubcategory 
    ? (productsBySubcategory[activeSubcategory] || [])
    : allProducts;

  const activeSub = PETS_SUBCATEGORIES.find(s => s.slug === activeSubcategory);

  return (
    <>
      {/* Subcategory Filter Tabs */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">
          Filtrar por subcategoria
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {/* All button */}
          <button
            onClick={() => setActiveSubcategory(null)}
            className={`
              group flex items-center gap-2.5 px-5 py-3 rounded-2xl border-2 font-bold text-sm
              transition-all duration-300 cursor-pointer
              ${!activeSubcategory 
                ? "bg-brand-forest text-white border-brand-forest shadow-[0_4px_14px_rgba(45,106,30,0.35)] scale-105" 
                : "bg-white text-brand-dark border-gray-200 hover:border-brand-forest/40 hover:shadow-md hover:-translate-y-0.5"
              }
            `}
          >
            <PawPrint size={22} weight={!activeSubcategory ? "fill" : "duotone"} />
            <span>Todos</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${!activeSubcategory ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
              {allProducts.length}
            </span>
          </button>

          {PETS_SUBCATEGORIES.map((sub) => {
            const Icon = sub.icon;
            const isActive = activeSubcategory === sub.slug;
            const count = (productsBySubcategory[sub.slug] || []).length;

            return (
              <button
                key={sub.slug}
                onClick={() => setActiveSubcategory(sub.slug)}
                className={`
                  group flex items-center gap-2.5 px-5 py-3 rounded-2xl border-2 font-bold text-sm
                  transition-all duration-300 cursor-pointer
                  ${isActive 
                    ? `${sub.bgColor} ${sub.color} shadow-lg scale-105` 
                    : "bg-white text-brand-dark border-gray-200 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5"
                  }
                `}
              >
                <Icon size={22} weight={isActive ? "fill" : "duotone"} className={isActive ? sub.color : "text-gray-400 group-hover:text-gray-600"} />
                <span>{sub.name}</span>
                {count > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? "bg-white/60" : "bg-gray-100 text-gray-500"}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active subcategory indicator */}
      {activeSub && (
        <div className="flex items-center gap-2 mb-4">
          <activeSub.icon size={20} weight="fill" className={activeSub.color} />
          <span className="font-display font-bold text-lg text-brand-dark">{activeSub.name}</span>
          <button
            onClick={() => setActiveSubcategory(null)}
            className="ml-auto text-xs text-gray-400 hover:text-brand-forest transition-colors font-medium cursor-pointer"
          >
            ← Voltar para todos
          </button>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between mb-6">
        <span className="text-gray-500 font-medium">
          Mostrando <strong className="text-brand-dark">{displayProducts.length}</strong> produtos
          {activeSub && <> em <strong className="text-brand-dark">{activeSub.name}</strong></>}
        </span>
      </div>

      {/* Product Grid */}
      {displayProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-gray-400 text-2xl">🐾</span>
          </div>
          <h3 className="text-xl font-bold text-brand-dark mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            No momento não temos produtos cadastrados nesta subcategoria. Tente outra categoria ou veja todos os produtos.
          </p>
          <button
            onClick={() => setActiveSubcategory(null)}
            className="mt-6 px-6 py-2 bg-brand-forest text-white rounded-md font-bold hover:bg-brand-forest-light transition-colors cursor-pointer"
          >
            Ver todos os produtos PETS
          </button>
        </div>
      )}
    </>
  );
}
