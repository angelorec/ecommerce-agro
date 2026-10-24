import Link from "next/link";
import { PawPrint, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function CategoryGrid() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="text-center mb-10">
          <h2 className="font-display font-black text-2xl md:text-3xl text-brand-dark tracking-tight">
            Navegue por <span className="text-brand-forest">Categoria</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">Encontre tudo para seus animais com facilidade</p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/categorias/pets"
            className="group relative w-full max-w-md overflow-hidden rounded-3xl border-2 border-brand-forest/10 bg-gradient-to-br from-brand-forest/5 via-emerald-50 to-brand-gold/10 shadow-lg hover:shadow-2xl hover:border-brand-forest/30 transition-all duration-500 hover:-translate-y-2"
          >
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-brand-forest/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brand-gold/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10 flex flex-col items-center gap-5 p-10 md:p-14">
              {/* Icon container */}
              <div className="relative">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-brand-forest to-brand-forest-dark flex items-center justify-center shadow-[0_8px_30px_rgba(45,106,30,0.35)] group-hover:shadow-[0_12px_40px_rgba(45,106,30,0.5)] group-hover:scale-110 transition-all duration-500">
                  <PawPrint 
                    size={64} 
                    weight="fill" 
                    className="text-white drop-shadow-md group-hover:rotate-12 transition-transform duration-500" 
                  />
                </div>
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full border-2 border-brand-forest/20 animate-ping opacity-30" />
              </div>

              {/* Text */}
              <div className="text-center">
                <h3 className="font-display font-black text-3xl md:text-4xl text-brand-dark tracking-tight uppercase">
                  PETS
                </h3>
                <p className="text-gray-500 text-sm mt-2 max-w-xs">
                  Rações, petiscos, acessórios, higiene e muito mais para cães e gatos
                </p>
              </div>

              {/* Subcategory pills */}
              <div className="flex flex-wrap justify-center gap-2 mt-1">
                {["Rações Cães", "Rações Gato", "Petiscos", "Acessórios", "Higiene & Banho"].map((sub) => (
                  <span 
                    key={sub} 
                    className="text-[11px] font-semibold text-brand-forest/70 bg-brand-forest/8 px-3 py-1 rounded-full border border-brand-forest/10"
                  >
                    {sub}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-brand-forest font-bold text-sm uppercase tracking-wider mt-2 group-hover:gap-3 transition-all duration-300">
                <span>Explorar Categoria</span>
                <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
