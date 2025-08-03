"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { SearchBox } from "./SearchBox";
import { VirtualScrollList } from "./VirtualScrollList";
import { usePeopleInfiniteQuery } from "@/hooks/usePeopleInfiniteQuery";

export function PeopleList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedHobbies = useMemo(
    () => searchParams.get("hobbies")?.split(",").filter(Boolean) || [],
    [searchParams]
  );
  const selectedNationalities = useMemo(
    () => searchParams.get("nationality")?.split(",").filter(Boolean) || [],
    [searchParams]
  );

  // Local input state
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const [debouncedSearch] = useDebounce(searchInput, 300);

  // Sync debounced search term to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    router.replace(`?${params.toString()}`);
  }, [debouncedSearch, router, searchParams]);

  const { data, isLoading, fetchNextPage, hasNextPage } =
    usePeopleInfiniteQuery({
      search: debouncedSearch || undefined,
      hobbies: selectedHobbies.length > 0 ? selectedHobbies : undefined,
      nationality:
        selectedNationalities.length > 0 ? selectedNationalities : undefined,
    });

  const people = data?.pages.flatMap((page) => page.data) || [];
  const totalCount = data?.pages[0]?.pagination.total || 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl lg:text-2xl font-bold">People ({totalCount})</h1>
        <div className="w-full sm:w-80">
          <SearchBox
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Search by name..."
          />
        </div>
      </div>

      <VirtualScrollList
        people={people}
        isLoading={isLoading}
        hasNextPage={!!hasNextPage}
        onLoadMore={fetchNextPage}
      />
    </div>
  );
}
