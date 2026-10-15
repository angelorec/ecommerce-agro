import { getProductBySlug, getFeaturedProducts } from "@/lib/hiper/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/product/ProductDetailClient";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getFeaturedProducts();

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
