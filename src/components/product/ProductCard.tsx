"use client";

import Image from "next/image";
import Link from "next/link";
import { HiperProduct } from "@/lib/hiper/types";
import { ShoppingCart } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart";

interface ProductCardProps {
  product: HiperProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const hasDiscount = product.promotionalPrice && product.promotionalPrice < product.price;

  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-brand-forest hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col h-full relative">

      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {hasDiscount && (
          <span className="bg-brand-red text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm">
            Oferta
          </span>
        )}
        {product.stock > 0 && product.stock <= 5 && (
          <span className="bg-brand-gold text-brand-dark text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm">
            Últimas {product.stock}
          </span>
        )}
      </div>

      <Link href={`/produtos/${product.id}`} className="relative h-48 w-full bg-gray-50 flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="font-display font-black text-6xl text-brand-forest">RP</span>
        </div>
        <Image
          src={product.images[0] || '/images/placeholder.jpg'}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300 relative z-10"
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link
          href={`/categorias/${product.categoryName.toLowerCase().replace(/ /g, '-')}`}
          className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 hover:text-brand-forest transition-colors"
        >
          {product.categoryName}
        </Link>

        <Link href={`/produtos/${product.id}`} className="group-hover:text-brand-forest transition-colors">
          <h3 className="font-sans font-medium text-sm text-brand-dark line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-4 flex items-end justify-between gap-2">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-xs text-gray-400 line-through">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </span>
                <span className="font-display font-bold text-xl text-brand-forest leading-none">
                  R$ {product.promotionalPrice!.toFixed(2).replace(".", ",")}
                </span>
              </>
            ) : (
              <span className="font-display font-bold text-xl text-brand-forest leading-none">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="w-10 h-10 rounded-full bg-brand-forest text-white flex items-center justify-center hover:bg-brand-forest-dark active:scale-90 transition-all flex-shrink-0 shadow-md shadow-brand-forest/20"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <ShoppingCart size={20} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}
