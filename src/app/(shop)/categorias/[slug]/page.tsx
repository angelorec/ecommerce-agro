import { getProducts } from "@/lib/hiper/products";
import { getCategories } from "@/lib/hiper/categories";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

interface Props {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categories = await getCategories();

  const category = categories.find((c: { slug: string; name: string }) => c.slug === slug || c.name.toLowerCase() === slug.toLowerCase());
  
  if (!category && slug !== 'ofertas') {
    notFound();
  }

  const categoryName = category ? category.name : 'Ofertas da Semana';
  
  // Note: in a real implementation we would pass the category ID or 'ofertas' flag to getProducts
  const { data: products, total } = await getProducts(1, 20);
  
  // Fake filter just for presentation purposes since we are mocking
  const filteredProducts = products.filter(p => 
    slug === 'ofertas' ? p.promotionalPrice !== undefined : p.categoryName.toLowerCase() === category?.name.toLowerCase()
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-forest transition-colors">Início</Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-brand-forest transition-colors">Produtos</Link>
          <span>/</span>
          <span className="text-brand-dark font-medium">{categoryName}</span>
        </nav>

        {/* Category Header Banner */}
        <div className="bg-brand-forest rounded-xl p-8 md:p-12 mb-8 text-white relative overflow-hidden">
          {/* Subtle wood texture or pattern in the background */}
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
                <span className="text-gray-400 text-2xl">🚜</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                No momento não temos produtos cadastrados nesta categoria. Tente voltar mais tarde ou veja nossos destaques.
              </p>
              <Link href="/produtos" className="mt-6 px-6 py-2 bg-brand-forest text-white rounded-md font-bold hover:bg-brand-forest-light transition-colors">
                Ver todos os produtos
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
