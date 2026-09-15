import Image from "next/image";
import Link from "next/link";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

export function HeroBanner() {
  return (
    <section className="relative w-full h-[600px] sm:h-[500px] md:h-[600px] overflow-hidden bg-brand-dark">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/banner-1.png"
          alt="Paisagem de fazenda no pôr do sol"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent md:hidden" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-center max-w-[1400px]">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forest/90 text-white text-xs font-bold uppercase tracking-wider border border-white/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            Promoção Mês de Aniversário
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white leading-[1.1] tracking-tight">
            Tudo para o <br />
            <span className="text-brand-gold">Produtor Rural!</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-200 max-w-[500px] leading-relaxed">
            Qualidade, preço baixo e confiança você encontra aqui no Rancho dos Pinheiros.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/ofertas" 
              className="inline-flex items-center justify-center gap-2 bg-brand-forest hover:bg-brand-forest-light text-white font-bold text-lg px-8 py-4 rounded-md transition-all active:scale-[0.98] shadow-[0_4px_14px_0_rgba(45,106,30,0.39)]"
            >
              Ver Ofertas
              <ArrowRight size={20} weight="bold" />
            </Link>
            
            <a 
              href="https://wa.me/5549998142661" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-bold text-lg px-8 py-4 rounded-md transition-all active:scale-[0.98] shadow-lg"
            >
              <WhatsappLogo size={24} weight="fill" />
              Peça Agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
