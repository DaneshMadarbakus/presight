export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-4 lg:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <div className="h-8 w-80 bg-muted animate-pulse rounded mb-2" />
            <div className="h-5 w-96 bg-muted animate-pulse rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-20 bg-muted animate-pulse rounded" />
            <div className="h-8 w-20 bg-muted animate-pulse rounded" />
          </div>
        </div>

        <div className="flex gap-4 lg:gap-6">
          {/* Desktop Sidebar Skeleton */}
          <div className="hidden lg:block w-64 bg-muted animate-pulse rounded-lg h-96" />

          {/* Main Content Skeleton */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="h-8 w-32 bg-muted animate-pulse rounded" />
              <div className="h-10 w-80 bg-muted animate-pulse rounded" />
            </div>

            {/* Cards Grid Skeleton */}
            <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 p-2 sm:p-4 justify-center">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full sm:w-[48%] lg:w-[48%] xl:w-[32%] h-32 bg-muted animate-pulse rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
