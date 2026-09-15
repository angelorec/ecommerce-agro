"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { 
  List, X, ShoppingCart, User, WhatsappLogo, 
  PawPrint, Horse, Egg, Fish, Tag, House, Info, Phone
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";

const navItems = [
  { href: "/", label: "Início", icon: House },
  { href: "/categorias/pets", label: "Pets (Cães e Gatos)", icon: PawPrint },
  { href: "/categorias/grandes-animais", label: "Grandes Animais", icon: Horse },
  { href: "/categorias/avicola", label: "Avícola", icon: Egg },
  { href: "/categorias/peixes", label: "Peixes e Alevinos", icon: Fish },
  { href: "/ofertas", label: "Ofertas da Semana 🔥", icon: Tag, accent: true },
  { href: "/sobre", label: "Sobre o Rancho", icon: Info },
  { href: "/contato", label: "Contato", icon: Phone },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItems, toggleCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const totalItems = mounted ? getTotalItems() : 0;

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <div className="flex md:hidden items-center gap-3">
      {/* Cart icon in mobile bar */}
      <button
        onClick={toggleCart}
        className="relative p-2 text-brand-dark"
        aria-label="Abrir carrinho"
      >
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-brand-red text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-brand-dark"
        aria-label="Abrir menu"
      >
        <List size={26} weight="bold" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[110] backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-[80vw] max-w-[320px] bg-brand-dark text-white z-[111] flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-brand-gold">
                    <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-display font-black text-sm uppercase leading-tight">Rancho dos Pinheiros</p>
                    <p className="text-brand-gold text-[10px] font-bold uppercase tracking-widest">Agropecuária</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Fechar menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Links */}
              <ul className="flex-1 overflow-y-auto py-4 space-y-1 px-3">
                {navItems.map(({ href, label, icon: Icon, accent }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${
                        accent
                          ? "text-brand-red bg-brand-red/10 hover:bg-brand-red/20"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon size={20} className={accent ? "text-brand-red" : "text-brand-gold"} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 space-y-3">
                <Link
                  href="/conta"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-brand-forest text-white font-bold text-sm hover:bg-brand-forest-light transition-colors"
                >
                  <User size={20} />
                  Minha Conta
                </Link>
                <a
                  href="https://wa.me/5549998142661"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-600 text-white font-bold text-sm hover:bg-green-500 transition-colors"
                >
                  <WhatsappLogo size={20} weight="fill" />
                  (49) 99814-2661
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
