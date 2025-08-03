import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getPeople } from "@/api/people";
import { Person, PaginatedResponse } from "@shared/types/person";

export function usePeopleInfiniteQuery({
  search,
  hobbies,
  nationality,
}: {
  search?: string;
  hobbies?: string[];
  nationality?: string[];
}) {
  return useInfiniteQuery<
    PaginatedResponse<Person>,
    Error,
    InfiniteData<PaginatedResponse<Person>>,
    [string, string?, string[]?, string[]?],
    number
  >({
    queryKey: ["people", search, hobbies, nationality],
    queryFn: ({ pageParam }) =>
      getPeople({
        page: pageParam,
        limit: 50,
        search,
        hobbies,
        nationality,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1,
  });
}
