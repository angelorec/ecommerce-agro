import { CheckCircle, CurrencyCircleDollar, Handshake, Truck } from "@phosphor-icons/react/dist/ssr";

const features = [
  {
    icon: CheckCircle,
    title: "Produtos de",
    subtitle: "Qualidade",
  },
  {
    icon: CurrencyCircleDollar,
    title: "Preço Justo",
    subtitle: "De Verdade",
  },
  {
    icon: Handshake,
    title: "Atendimento",
    subtitle: "Especializado",
  },
  {
    icon: Truck,
    title: "Agilidade Na",
    subtitle: "Entrega",
  }
];

export function TrustBar() {
  return (
    <section className="bg-brand-forest border-t-2 border-b-2 border-brand-gold py-8 mt-12">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-x-0 md:divide-x divide-white/20">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 md:gap-4 px-2 justify-center md:justify-start">
              <div className="shrink-0">
                <feature.icon size={40} weight="fill" className="text-brand-gold" />
              </div>
              <div className="flex flex-col text-white uppercase font-display font-bold text-[11px] sm:text-sm tracking-wide">
                <span>{feature.title}</span>
                <span className="text-brand-gold">{feature.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
