"use client";

import { useCart } from "@/lib/cart";
import { X, Trash, Plus, Minus, ShoppingCart, ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getSubtotal } = useCart();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [setIsOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  const subtotal = getSubtotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white z-[101] flex flex-col shadow-2xl border-l border-brand-gold"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 bg-brand-forest text-white">
              <h2 className="font-display font-bold text-lg uppercase tracking-wide flex items-center gap-2">
                <ShoppingCart size={24} weight="fill" className="text-brand-gold" />
                Seu Carrinho
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Fechar carrinho"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                    <ShoppingCart size={40} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-brand-dark">Carrinho vazio</h3>
                  <p className="text-gray-500 text-sm max-w-[250px]">
                    Navegue pela nossa loja e adicione produtos que deseja comprar.
                  </p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="mt-4 px-6 py-2 bg-brand-dark text-white rounded-md font-bold uppercase tracking-wider text-sm hover:bg-brand-forest transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => {
                    const price = item.product.promotionalPrice || item.product.price;
                    return (
                      <li key={item.product.id} className="bg-white rounded-lg p-3 border border-gray-200 flex gap-4 relative shadow-sm">
                        <button 
                          onClick={() => removeItem(item.product.id)}
                          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-brand-red transition-colors"
                        >
                          <Trash size={18} />
                        </button>
                        
                        <div className="relative w-20 h-20 bg-gray-50 rounded-md border border-gray-100 overflow-hidden flex-shrink-0">
                          <Image 
                            src={item.product.images[0] || '/images/placeholder.jpg'} 
                            alt={item.product.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        
                        <div className="flex-1 flex flex-col pr-6">
                          <Link href={`/produtos/${item.product.id}`} onClick={() => setIsOpen(false)}>
                            <h4 className="text-sm font-medium text-brand-dark line-clamp-2 leading-tight hover:text-brand-forest transition-colors">
                              {item.product.name}
                            </h4>
                          </Link>
                          
                          <div className="mt-auto pt-2 flex items-center justify-between">
                            {/* Quantity Control */}
                            <div className="flex items-center border border-gray-200 rounded-md bg-gray-50 h-8">
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-brand-dark hover:bg-gray-100 transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={12} weight="bold" />
                              </button>
                              <span className="w-8 text-center text-sm font-bold text-brand-dark">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-brand-dark hover:bg-gray-100 transition-colors"
                                disabled={item.quantity >= item.product.stock}
                              >
                                <Plus size={12} weight="bold" />
                              </button>
                            </div>
                            
                            <span className="font-display font-bold text-brand-forest">
                              R$ {(price * item.quantity).toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 md:p-6 border-t border-gray-200 bg-white shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-display font-black text-2xl text-brand-dark">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:border-brand-forest text-brand-dark hover:text-brand-forest font-bold uppercase tracking-widest text-sm h-14 rounded-md transition-all active:scale-[0.98]"
                  >
                    Continuar Comprando
                  </button>
                  <Link 
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-brand-forest hover:bg-brand-forest-light text-white font-bold uppercase tracking-widest text-sm h-14 rounded-md transition-all active:scale-[0.98] shadow-lg shadow-brand-forest/20"
                  >
                    Finalizar Compra
                    <ArrowRight size={20} weight="bold" />
                  </Link>
                </div>
                
                <p className="text-center text-xs text-gray-400 mt-4">
                  Frete e impostos serão calculados no checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
