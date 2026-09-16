import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { TrustBar } from "@/components/home/TrustBar";
import { ProductCard } from "@/components/product/ProductCard";
import { OffersCarousel } from "@/components/home/OffersCarousel";
import { getFeaturedProducts, getProducts } from "@/lib/hiper/products";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  
  // Buscar mais produtos para encontrar ofertas (idealmente a API teria um filtro, mas fazemos um fetch maior aqui)
  const allProductsRes = await getProducts(1, 100);
  const offerProducts = allProductsRes.data.filter(p => p.promotionalPrice && p.promotionalPrice < p.price);

  return (
    <>
      <HeroBanner />
      <CategoryGrid />
      
      {/* Carrossel de Ofertas */}
      {offerProducts.length > 0 && (
        <OffersCarousel products={offerProducts} />
      )}
      
      {/* Featured Products */}
      <section className="py-20 bg-brand-beige/20">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-black text-brand-dark tracking-tight">
              Destaques do <span className="text-brand-forest">Rancho</span>
            </h2>
            <a href="/produtos" className="hidden md:flex items-center gap-2 text-sm font-bold text-brand-forest hover:text-brand-forest-dark transition-colors uppercase tracking-wider bg-white px-5 py-2.5 rounded-full shadow-sm hover:shadow-md border border-brand-forest/10">
              Ver todos
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Brand Quote */}
      <section className="py-24 bg-wood-texture border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="w-16 h-16 mx-auto bg-brand-forest rounded-full flex items-center justify-center mb-6 border-4 border-brand-gold">
            <span className="text-brand-gold font-display font-black text-2xl">RP</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-brand-dark leading-tight">
            "Qualidade de verdade, preço justo e atendimento de quem conhece a lida."
          </h2>
          <p className="mt-6 text-brand-forest font-bold uppercase tracking-widest text-sm">
            Bem-vindo ao Rancho dos Pinheiros
          </p>
        </div>
      </section>
    </>
  );
}
