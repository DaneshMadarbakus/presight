import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFilterOptions } from "@/api/people";
import { FilterSidebar } from "@/components/people/FilterSidebar";
import { MobileFilters } from "@/components/people/MobileFilters";
import { PeopleList } from "@/components/people/PeopleList";

// Ensure page is rendered at request time to get latest filter options
export const dynamic = "force-dynamic";

export default async function PeoplePage() {
  // SSR: Fetch filter options on nextjs server
  const filterOptions = await getFilterOptions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-4 lg:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1 lg:mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Virtual Scrolling Demo
            </h1>
            <p className="text-sm lg:text-base text-muted-foreground">
              Paginated user list with infinite scroll, filtering, and search
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MobileFilters filterOptions={filterOptions} />
            <Button variant="outline" size="sm" asChild>
              <Link href="/">← Back</Link>
            </Button>
          </div>
        </div>

        <div className="flex gap-4 lg:gap-6">
          <div className="hidden lg:block">
            <Suspense
              fallback={
                <div className="w-64 h-96 bg-muted animate-pulse rounded-lg" />
              }
            >
              <FilterSidebar filterOptions={filterOptions} />
            </Suspense>
          </div>

          <div className="flex-1">
            <Suspense
              fallback={
                <div className="h-32 bg-muted animate-pulse rounded-lg" />
              }
            >
              <PeopleList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
