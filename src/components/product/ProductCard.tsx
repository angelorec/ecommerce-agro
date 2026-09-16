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
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-brand-forest/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">

      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {hasDiscount && (
          <span className="bg-brand-red text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm tracking-wide">
            Oferta
          </span>
        )}
        {product.stock > 0 && product.stock <= 5 && (
          <span className="bg-brand-gold text-brand-dark text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm tracking-wide">
            Últimas {product.stock}
          </span>
        )}
      </div>

      <Link href={`/produtos/${product.id}`} className="relative h-56 w-full bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
        {/* Placeholder elegante caso não haja imagem */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="w-24 h-24 rounded-full bg-brand-forest/5 flex items-center justify-center">
             <span className="font-display font-black text-4xl text-brand-forest/20 tracking-tighter">RP</span>
          </div>
        </div>
        {product.images[0] && !product.images[0].includes('placeholder') && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain p-6 group-hover:scale-110 transition-transform duration-500 ease-out relative z-10 drop-shadow-sm mix-blend-multiply"
          />
        )}
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link
          href={`/categorias/${product.categoryName.toLowerCase().replace(/ /g, '-')}`}
          className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 hover:text-brand-forest transition-colors"
        >
          {product.categoryName}
        </Link>

        <Link href={`/produtos/${product.id}`} className="group-hover:text-brand-forest transition-colors mt-1">
          <h3 className="font-sans font-semibold text-sm text-brand-dark line-clamp-2 leading-relaxed">
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
            className="w-11 h-11 rounded-xl bg-brand-forest text-white flex items-center justify-center hover:bg-brand-forest-dark active:scale-95 transition-all flex-shrink-0 shadow-[0_4px_14px_rgba(34,139,34,0.3)] hover:shadow-[0_6px_20px_rgba(34,139,34,0.4)]"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <ShoppingCart size={22} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}
