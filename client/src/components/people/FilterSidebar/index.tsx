"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FilterOptionsResponse } from "@shared/types/person";
import { FilterGroup } from "./FilterGroup";

interface FilterSidebarProps {
  filterOptions: FilterOptionsResponse;
  isMobile?: boolean;
}

export function FilterSidebar({
  filterOptions,
  isMobile = false,
}: FilterSidebarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedHobbies =
    searchParams.get("hobbies")?.split(",").filter(Boolean) || [];
  const selectedNationalities =
    searchParams.get("nationality")?.split(",").filter(Boolean) || [];

  const updateSearchParams = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.length > 0) {
      params.set(key, values.join(","));
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  const handleHobbyChange = (hobby: string, checked: boolean) => {
    const updated = checked
      ? [...selectedHobbies, hobby]
      : selectedHobbies.filter((h) => h !== hobby);
    updateSearchParams("hobbies", updated);
  };

  const handleNationalityChange = (nationality: string, checked: boolean) => {
    const updated = checked
      ? [...selectedNationalities, nationality]
      : selectedNationalities.filter((n) => n !== nationality);
    updateSearchParams("nationality", updated);
  };

  const content = (
    <>
      <FilterGroup
        title="Hobbies"
        type="hobbies"
        options={filterOptions.hobbies}
        selectedValues={selectedHobbies}
        onChange={handleHobbyChange}
      />
      <FilterGroup
        title="Nationalities"
        type="nationality"
        options={filterOptions.nationalities}
        selectedValues={selectedNationalities}
        onChange={handleNationalityChange}
      />
    </>
  );

  if (isMobile) {
    return (
      <div className="h-full w-full flex flex-col space-y-8">{content}</div>
    );
  }

  return (
    <div className="w-64 flex flex-col bg-gradient-to-b from-blue-50/50 to-purple-50/50 border rounded-lg shadow-lg">
      <div className="p-6 border-b bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-lg">
        <h2 className="text-xl font-semibold text-blue-900">Filters</h2>
        <p className="text-sm text-blue-700/80 mt-1">
          Refine your search results
        </p>
      </div>
      <div className="px-6 pb-6 space-y-8 pt-10">{content}</div>
    </div>
  );
}
