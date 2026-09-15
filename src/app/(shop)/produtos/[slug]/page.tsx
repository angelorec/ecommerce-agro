import { getProductBySlug, getFeaturedProducts } from "@/lib/hiper/products";
import { ProductCard } from "@/components/product/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Truck, ShieldCheck, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get some related products for the bottom section
  const relatedProducts = await getFeaturedProducts();
  
  const hasDiscount = product.promotionalPrice && product.promotionalPrice < product.price;
  const currentPrice = hasDiscount ? product.promotionalPrice! : product.price;

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <nav className="text-xs sm:text-sm text-gray-500 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-forest transition-colors">Início</Link>
            <span>/</span>
            <Link href="/produtos" className="hover:text-brand-forest transition-colors">Produtos</Link>
            <span>/</span>
            <Link href={`/categorias/${product.categoryName.toLowerCase()}`} className="hover:text-brand-forest transition-colors">{product.categoryName}</Link>
            <span>/</span>
            <span className="text-brand-dark font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-[1400px] mt-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-[60%] flex flex-col gap-4">
            <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-gray-50 rounded-2xl border border-gray-100 p-8 flex items-center justify-center">
              {/* Fallback styling */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <span className="font-display font-black text-9xl text-brand-forest">RP</span>
              </div>
              <Image
                src={product.images[0] || '/images/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-contain p-8 relative z-10"
                priority
              />
              {hasDiscount && (
                <div className="absolute top-4 left-4 z-20 bg-brand-red text-white font-bold uppercase tracking-wide px-3 py-1.5 rounded-md shadow-sm">
                  Oferta
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button key={i} className={`relative w-20 h-20 rounded-lg border-2 ${i === 0 ? 'border-brand-forest' : 'border-gray-200'} bg-gray-50 flex-shrink-0`}>
                    <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover rounded-md" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Buy */}
          <div className="w-full lg:w-[40%] flex flex-col">
            <Link href={`/categorias/${product.categoryName.toLowerCase()}`} className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 hover:text-brand-forest">
              {product.categoryName}
            </Link>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-brand-dark leading-tight mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
              <span>Marca: <span className="font-semibold text-brand-dark">{product.brand}</span></span>
              <span>SKU: {product.sku}</span>
            </div>

            {/* Price Section */}
            <div className="mb-8">
              {hasDiscount ? (
                <div className="flex flex-col">
                  <span className="text-gray-400 line-through text-lg">De R$ {product.price.toFixed(2).replace('.', ',')}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-4xl text-brand-forest">
                      R$ {product.promotionalPrice!.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                      -{Math.round(((product.price - product.promotionalPrice!) / product.price) * 100)}%
                    </span>
                  </div>
                </div>
              ) : (
                <span className="font-display font-black text-4xl text-brand-forest">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
              )}
              
              <div className="mt-2 text-sm text-gray-500">
                em até <span className="font-semibold text-brand-dark">3x sem juros</span> no cartão
              </div>
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-6 text-sm">
              <CheckCircle size={20} weight="fill" className="text-green-500" />
              <span className="font-medium text-green-700">Em estoque na loja física</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-md h-14 bg-white">
                <button className="px-4 text-gray-500 hover:text-brand-dark transition-colors text-xl font-medium">-</button>
                <input type="number" defaultValue="1" min="1" max={product.stock} className="w-12 text-center font-bold text-brand-dark focus:outline-none" readOnly />
                <button className="px-4 text-gray-500 hover:text-brand-dark transition-colors text-xl font-medium">+</button>
              </div>
              
              <button className="flex-1 h-14 bg-brand-forest hover:bg-brand-forest-light text-white font-bold text-lg rounded-md flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-brand-forest/30">
                <ShoppingCart size={24} weight="fill" />
                Comprar Agora
              </button>
            </div>

            {/* Shipping Calculator */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-8">
              <h3 className="font-bold flex items-center gap-2 text-brand-dark mb-3">
                <Truck size={20} /> Calcular Frete e Prazo
              </h3>
              <div className="flex gap-2">
                <input type="text" placeholder="Seu CEP" className="flex-1 h-11 px-4 border border-gray-300 rounded focus:outline-none focus:border-brand-forest focus:ring-1 focus:ring-brand-forest" />
                <button className="h-11 px-6 bg-white border border-gray-300 rounded text-brand-dark font-semibold hover:bg-gray-100 transition-colors">
                  Calcular
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Entregamos em toda a região via Transportadora ou Correios.
              </p>
            </div>

            {/* Safe Buy badges */}
            <div className="flex items-center justify-center gap-6 py-4 border-y border-gray-100 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck size={24} className="text-brand-gold" />
                <span>Compra Segura</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-display font-bold text-brand-dark mb-6 uppercase tracking-wide">Descrição do Produto</h2>
            <div className="prose prose-brand max-w-none text-gray-600">
              <p>{product.description}</p>
              
              <h4 className="font-bold text-brand-dark mt-6 mb-2">Especificações Técnicas:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Marca:</strong> {product.brand}</li>
                <li><strong>Peso/Volume:</strong> {product.weight} {product.weight > 100 ? 'g/ml' : 'kg/L'}</li>
                <li><strong>Categoria:</strong> {product.categoryName}</li>
                <li><strong>SKU:</strong> {product.sku}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-black text-brand-dark uppercase tracking-tight">
              Aproveite e <span className="text-brand-forest">Leve Também</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProducts.slice(0, 5).map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
