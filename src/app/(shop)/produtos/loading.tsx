import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";

export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mb-6" />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar skeleton */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
              <div className="h-5 bg-gray-200 rounded w-24 animate-pulse" />
              <div className="space-y-3 pt-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${60 + i * 10}%` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Products grid skeleton */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 h-14 animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
