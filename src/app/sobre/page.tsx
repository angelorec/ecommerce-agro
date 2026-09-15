import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, WhatsappLogo, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós | Rancho dos Pinheiros Agropecuária",
  description: "Conheça a história do Rancho dos Pinheiros em Lages/SC — a agropecuária de confiança do produtor rural com qualidade, preço justo e atendimento especializado.",
};

const values = [
  { title: "Qualidade", desc: "Trabalhamos apenas com produtos de marcas renomadas e fornecedores de confiança." },
  { title: "Preço Justo", desc: "Negociamos direto com fabricantes para garantir os melhores preços para você." },
  { title: "Atendimento", desc: "Nossa equipe conhece a lida do campo e fala a sua língua." },
  { title: "Agilidade", desc: "Entregamos no campo e na cidade, com agilidade e cuidado." },
];

export default function SobrePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-64 md:h-96 bg-brand-dark overflow-hidden">
        <Image
          src="/images/hero/banner-1.png"
          alt="Paisagem do campo"
          fill
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display font-black text-4xl md:text-6xl text-white uppercase tracking-tight drop-shadow-lg">
            Sobre o Rancho
          </h1>
          <p className="text-brand-gold font-bold uppercase tracking-widest text-sm mt-3">
            Lages — Santa Catarina
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-4 border-brand-gold shadow-xl">
                <Image
                  src="/images/hero/banner-2.png"
                  alt="Loja Rancho dos Pinheiros"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-6">
              <div>
                <p className="text-brand-forest font-bold uppercase tracking-widest text-sm mb-2">Nossa História</p>
                <h2 className="font-display font-black text-3xl md:text-4xl text-brand-dark uppercase tracking-tight leading-tight">
                  De Lages Para o<br/>
                  <span className="text-brand-forest">Campo de Todos</span>
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed">
                O Rancho dos Pinheiros nasceu do amor pelo campo e pela criação. Fundado em Lages, no coração de Santa Catarina, somos uma agropecuária que entende de verdade as necessidades do produtor rural e do dono de animais.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Com uma linha completa de rações, vacinas, remédios veterinários e acessórios para animais de grande e pequeno porte, nosso compromisso é oferecer sempre qualidade de verdade, preço justo e um atendimento de quem conhece a lida do dia a dia.
              </p>

              <div className="pt-2">
                <p className="font-display font-black text-xl text-brand-dark uppercase tracking-wide">
                  "Bora pro Rancho!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-brand-dark border-y-4 border-brand-gold">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tight text-center mb-12">
            Nossos <span className="text-brand-gold">Valores</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-4 bg-white/5 rounded-xl p-6 border border-white/10 hover:border-brand-gold/50 transition-colors">
                <CheckCircle size={28} weight="fill" className="text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold text-lg text-white uppercase mb-1">{title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-brand-beige/40">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-display font-black text-3xl text-brand-dark uppercase tracking-tight mb-10">
            Onde <span className="text-brand-forest">Estamos</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center gap-3 shadow-sm">
              <MapPin size={32} className="text-brand-gold" weight="fill" />
              <h4 className="font-bold text-brand-dark">Endereço</h4>
              <p className="text-sm text-gray-500 text-center leading-relaxed">
                Rua São Joaquim, 1187<br/>
                Bairro Copacabana<br/>
                Lages/SC — 88504-010
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center gap-3 shadow-sm">
              <Phone size={32} className="text-brand-gold" weight="fill" />
              <h4 className="font-bold text-brand-dark">Telefone</h4>
              <p className="text-sm text-gray-500">(49) 99814-2661</p>
              <p className="text-xs text-gray-400">Seg–Sáb: 8h–18h</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center gap-3 shadow-sm">
              <WhatsappLogo size={32} className="text-green-500" weight="fill" />
              <h4 className="font-bold text-brand-dark">WhatsApp</h4>
              <a
                href="https://wa.me/5549998142661"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-600 font-bold hover:underline"
              >
                Chamar agora
              </a>
            </div>
          </div>

          <Link
            href="/contato"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-forest text-white font-bold uppercase tracking-wider rounded-md hover:bg-brand-forest-light transition-colors shadow-lg shadow-brand-forest/20"
          >
            Fale Conosco
          </Link>
        </div>
      </section>
    </div>
  );
}
