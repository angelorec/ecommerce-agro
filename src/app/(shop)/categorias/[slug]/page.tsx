import { getProducts } from "@/lib/hiper/products";
import { getCategories } from "@/lib/hiper/categories";
import { ProductCard } from "@/components/product/ProductCard";
import { PetsCategoryClient } from "@/components/product/PetsCategoryClient";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretDown, PawPrint } from "@phosphor-icons/react/dist/ssr";

const PETS_SUB_SLUGS = [
  "acessorios-brinquedos",
  "higiene-banho",
  "petiscos",
  "racoes-cao",
  "racoes-gato",
];

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  // ── PETS Category: special page with subcategory tabs ──
  if (slug === "pets") {
    const { data: allPetsProducts } = await getProducts(1, 200, "pets");

    // Build products grouped by each subcategory
    const productsBySubcategory: Record<string, typeof allPetsProducts> = {};
    for (const subSlug of PETS_SUB_SLUGS) {
      const { data: subProducts } = await getProducts(1, 200, subSlug);
      productsBySubcategory[subSlug] = subProducts;
    }

    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-[1400px]">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-forest transition-colors">Início</Link>
            <span>/</span>
            <span className="text-brand-dark font-medium">PETS</span>
          </nav>

          {/* PETS Header Banner */}
          <div className="bg-gradient-to-r from-brand-forest via-brand-forest-dark to-brand-forest rounded-2xl p-8 md:p-12 mb-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            {/* Decorative paw prints */}
            <div className="absolute top-4 right-8 opacity-10">
              <PawPrint size={120} weight="fill" />
            </div>
            <div className="absolute bottom-2 right-32 opacity-5">
              <PawPrint size={80} weight="fill" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <PawPrint size={32} weight="fill" className="text-brand-gold" />
                </div>
                <div>
                  <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight">
                    PETS
                  </h1>
                  <p className="text-white/60 text-sm font-medium mt-0.5">
                    {allPetsProducts.length} produtos disponíveis
                  </p>
                </div>
              </div>
              <p className="text-white/80 max-w-2xl text-lg">
                Tudo para cães e gatos: rações premium, petiscos, acessórios, higiene e muito mais com a qualidade Rancho dos Pinheiros.
              </p>
            </div>
          </div>

          {/* Client component with subcategory filter tabs + product grid */}
          <PetsCategoryClient
            allProducts={allPetsProducts}
            productsBySubcategory={productsBySubcategory}
          />
        </div>
      </div>
    );
  }

  // ── Standard category page (non-PETS) ──
  const categories = await getCategories();
  const category = categories.find((c: { slug: string; name: string }) => c.slug === slug || c.name.toLowerCase() === slug.toLowerCase());
  
  if (!category && slug !== 'ofertas') {
    notFound();
  }

  const categoryName = category ? category.name : 'Ofertas da Semana';
  
  const { data: rawProducts } = await getProducts(1, 100, slug === 'ofertas' ? undefined : slug);
  
  const filteredProducts = slug === 'ofertas' 
    ? rawProducts.filter(p => p.promotionalPrice !== undefined)
    : rawProducts;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-forest transition-colors">Início</Link>
          <span>/</span>
          <Link href="/categorias/pets" className="hover:text-brand-forest transition-colors">PETS</Link>
          <span>/</span>
          <span className="text-brand-dark font-medium">{categoryName}</span>
        </nav>

        {/* Category Header Banner */}
        <div className="bg-brand-forest rounded-xl p-8 md:p-12 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          
          <div className="relative z-10">
            <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight mb-4">
              {categoryName}
            </h1>
            <p className="text-white/80 max-w-2xl text-lg">
              {slug === 'ofertas' 
                ? 'Os melhores preços e oportunidades para você economizar sem abrir mão da qualidade.'
                : 'Tudo o que você precisa com a qualidade e confiança que só o Rancho dos Pinheiros tem.'}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6">
          {/* Controls */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-gray-500 font-medium">
              Mostrando <strong className="text-brand-dark">{filteredProducts.length}</strong> produtos
            </span>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Ordenar por:</span>
              <div className="relative border border-gray-200 rounded-md bg-gray-50 flex items-center px-3 py-1.5 cursor-pointer hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium mr-2">Relevância</span>
                <CaretDown size={14} />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-gray-400 text-2xl">🐾</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                No momento não temos produtos cadastrados nesta categoria. Tente voltar mais tarde ou veja nossos destaques.
              </p>
              <Link href="/categorias/pets" className="mt-6 px-6 py-2 bg-brand-forest text-white rounded-md font-bold hover:bg-brand-forest-light transition-colors">
                Voltar para PETS
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
