"use client";

import { useEffect, useRef, useState } from "react";
import { HiperProduct } from "@/lib/hiper/types";
import { ProductCard } from "@/components/product/ProductCard";
import { CaretLeft, CaretRight, Tag } from "@phosphor-icons/react";

interface OffersCarouselProps {
  products: HiperProduct[];
}

export function OffersCarousel({ products }: OffersCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered || !scrollContainerRef.current || products.length === 0) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (container.scrollLeft >= maxScroll - 10) {
        // Reset to beginning if at the end
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll to next item (approximate width of a card + gap)
        const itemWidth = container.clientWidth > 1024 ? container.clientWidth / 5 : 
                         container.clientWidth > 768 ? container.clientWidth / 3 : 
                         container.clientWidth / 1.5;
        container.scrollBy({ left: itemWidth, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, products.length]);

  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
  };

  useEffect(() => {
    updateScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const itemWidth = container.clientWidth > 1024 ? container.clientWidth / 5 : 
                     container.clientWidth > 768 ? container.clientWidth / 3 : 
                     container.clientWidth / 1.5;
                     
    container.scrollBy({
      left: direction === 'left' ? -itemWidth : itemWidth,
      behavior: "smooth"
    });
  };

  if (products.length === 0) return null;

  return (
    <section 
      className="py-16 bg-white border-y border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
              <Tag size={24} weight="fill" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-black text-brand-dark tracking-tight">
              Ofertas <span className="text-brand-red">Especiais</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-brand-forest disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Rolar para a esquerda"
            >
              <CaretLeft size={20} weight="bold" />
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-brand-forest disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Rolar para a direita"
            >
              <CaretRight size={20} weight="bold" />
            </button>
          </div>
        </div>
        
        <div className="relative -mx-4 px-4">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map(product => (
              <div key={product.id} className="snap-start snap-always shrink-0 w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] xl:w-[280px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CSS global embutido apenas para esconder barra de rolagem em webkit (caso necessário, ou pode estar no globals.css) */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
