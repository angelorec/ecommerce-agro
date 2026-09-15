export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden animate-pulse flex flex-col h-full">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 flex flex-col gap-3 flex-grow">
        <div className="h-2.5 bg-gray-200 rounded w-1/3" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded" />
          <div className="h-3 bg-gray-200 rounded w-4/5" />
        </div>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="space-y-1.5">
            <div className="h-2 bg-gray-200 rounded w-16" />
            <div className="h-5 bg-gray-200 rounded w-24" />
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
