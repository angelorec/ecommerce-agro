"use client";

import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlass, ShoppingCart, User, WhatsappLogo, PawPrint } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart";
import { useSyncExternalStore } from "react";
import { MobileNav } from "./MobileNav";

const emptySubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export function Header() {
  const { getTotalItems, getSubtotal, toggleCart } = useCart();
  const mounted = useHydrated();

  const totalItems = mounted ? getTotalItems() : 0;
  const subtotal = mounted ? getSubtotal() : 0;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      {/* Top bar — desktop only */}
      <div className="bg-brand-forest text-white text-xs py-1.5 px-4 text-center hidden md:block">
        <PawPrint size={14} weight="fill" className="inline mr-1 text-brand-gold" />
        Tudo para o seu Pet com carinho e qualidade! &nbsp;|&nbsp;{" "}
        <a href="https://wa.me/5549998142661" className="underline font-bold hover:text-brand-gold transition-colors">
          (49) 99814-2661
        </a>
      </div>

      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Mobile nav */}
        <MobileNav />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-brand-gold shadow-md bg-brand-forest">
            <Image
              src="/images/logo.png"
              alt="Logo Rancho dos Pinheiros Agropecuária"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <p className="font-display font-black text-brand-dark leading-tight text-base lg:text-lg uppercase tracking-tight">
              Rancho <span className="text-brand-forest">dos</span> Pinheiros
            </p>
            <p className="text-[10px] text-brand-gold font-extrabold tracking-widest uppercase">Pet Shop</p>
          </div>
        </Link>

        {/* Search — desktop */}
        <form action="/busca" method="GET" className="hidden md:flex flex-1 max-w-xl mx-6 relative">
          <input
            type="text"
            name="q"
            placeholder="Buscar ração, acessório, medicamento pet..."
            className="w-full h-11 pl-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:border-brand-forest focus:ring-1 focus:ring-brand-forest transition-colors bg-gray-50 text-sm"
          />
          <button type="submit" aria-label="Buscar" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-forest hover:bg-gray-100 rounded-full transition-colors">
            <MagnifyingGlass size={20} weight="bold" />
          </button>
        </form>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4 flex-shrink-0">
          <a
            href="https://wa.me/5549998142661"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 text-brand-dark hover:text-green-600 transition-colors"
          >
            <WhatsappLogo size={24} weight="fill" className="text-green-500" />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Fale Conosco</span>
              <span className="text-sm font-bold">(49) 99814-2661</span>
            </div>
          </a>

          <Link href="/conta" className="p-2 text-brand-dark hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1.5">
            <User size={22} />
            <span className="text-sm font-medium">Entrar</span>
          </Link>

          <button
            onClick={toggleCart}
            className="flex items-center gap-2 bg-brand-forest text-white rounded-full pl-3 pr-4 py-2 hover:bg-brand-forest-light transition-colors relative"
            aria-label="Abrir carrinho"
          >
            <div className="relative">
              <ShoppingCart size={20} weight="fill" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-red text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-sm font-bold">
              R$ {subtotal.toFixed(2).replace(".", ",")}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <form action="/busca" method="GET" className="relative">
          <input
            type="text"
            name="q"
            placeholder="Buscar produto para seu pet..."
            className="w-full h-11 pl-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:border-brand-forest focus:ring-1 focus:ring-brand-forest transition-colors bg-gray-50 text-sm"
          />
          <button type="submit" aria-label="Buscar" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-forest hover:bg-gray-100 rounded-full transition-colors">
            <MagnifyingGlass size={20} weight="bold" />
          </button>
        </form>
      </div>


    </header>
  );
}
