import Image from "next/image";
import Link from "next/link";
import { MapPin, WhatsappLogo, InstagramLogo, EnvelopeSimple, PawPrint } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t-4 border-brand-gold">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-gold bg-white">
                <Image 
                  src="/images/logo.png" 
                  alt="Logo Rancho dos Pinheiros"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-display font-black leading-tight text-lg uppercase tracking-tight text-white">Rancho <span className="text-brand-gold">dos</span> Pinheiros</h2>
                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Pet Shop</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[280px]">
              Tudo para o seu pet com carinho e qualidade. Rações, acessórios, higiene e saúde animal com atendimento especializado.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://instagram.com/agropecuaria.rancho" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-colors">
                <InstagramLogo size={20} weight="fill" />
              </a>
              <a href="https://wa.me/5549998142661" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors">
                <WhatsappLogo size={20} weight="fill" />
              </a>
            </div>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg uppercase tracking-wider text-brand-gold">Contato</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-gold shrink-0 mt-0.5" />
                <span>Rua São Joaquim, 1187<br/>Bairro Copacabana<br/>Lages/SC - 88504-010<br/><span className="text-xs text-gray-400">Próximo ao Supermercado Martendal</span></span>
              </li>
              <li className="flex items-center gap-3">
                <WhatsappLogo size={20} className="text-brand-gold shrink-0" />
                <span>(49) 99814-2661</span>
              </li>
              <li className="flex items-center gap-3">
                <EnvelopeSimple size={20} className="text-brand-gold shrink-0" />
                <span>contato@ranchodospinheiros.com.br</span>
              </li>
            </ul>
          </div>

          {/* Links Col */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg uppercase tracking-wider text-brand-gold">
              <PawPrint size={18} weight="fill" className="inline mr-1" />
              Departamentos
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/categorias/caes" className="hover:text-white transition-colors">Cães</Link></li>
              <li><Link href="/categorias/gatos" className="hover:text-white transition-colors">Gatos</Link></li>
              <li><Link href="/categorias/higiene-pet" className="hover:text-white transition-colors">Higiene e Beleza Pet</Link></li>
              <li><Link href="/categorias/acessorios-pet" className="hover:text-white transition-colors">Acessórios Pet</Link></li>
              <li><Link href="/categorias/ofertas" className="hover:text-brand-red transition-colors font-medium">Ofertas da Semana</Link></li>
            </ul>
          </div>

          {/* Info Col */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg uppercase tracking-wider text-brand-gold">Informações</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre o Rancho</Link></li>
              <li><Link href="/contato" className="hover:text-white transition-colors">Fale Conosco</Link></li>
              <li><Link href="/produtos" className="hover:text-white transition-colors">Todos os Produtos</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Rancho dos Pinheiros Agropecuária. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
            <span>🐾 BORA PRO RANCHO!</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
