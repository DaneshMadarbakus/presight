"use client";

import { useState, Suspense } from "react";
import { FilterOptionsResponse } from "@shared/types/person";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterSidebar } from "./FilterSidebar";
import { Filter } from "lucide-react";

interface MobileFiltersProps {
  filterOptions: FilterOptionsResponse;
}

export function MobileFilters({ filterOptions }: MobileFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-80 p-0 bg-gradient-to-b from-blue-50 to-purple-50"
      >
        <SheetHeader className="p-6 pb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b border-blue-200/30">
          <SheetTitle className="text-xl text-blue-900">Filters</SheetTitle>
        </SheetHeader>
        <div className="px-6 pb-6 flex-1">
          <Suspense
            fallback={
              <div className="space-y-4">
                <div className="h-8 bg-muted animate-pulse rounded" />
                <div className="h-64 bg-muted animate-pulse rounded" />
              </div>
            }
          >
            <FilterSidebar filterOptions={filterOptions} isMobile={true} />
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  );
}
