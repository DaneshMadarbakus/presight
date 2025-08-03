import {
  Person,
  PaginatedResponse,
  FilterOptionsResponse,
} from "@shared/types/person";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function getPeople(params: {
  page?: number;
  limit?: number;
  search?: string;
  hobbies?: string[];
  nationality?: string[];
}): Promise<PaginatedResponse<Person>> {
  try {
    const searchParams = new URLSearchParams({
      ...(params.page && { page: params.page.toString() }),
      ...(params.limit && { limit: params.limit.toString() }),
      ...(params.search && { search: params.search }),
      ...(params.hobbies?.length && { hobbies: params.hobbies.join(",") }),
      ...(params.nationality?.length && {
        nationality: params.nationality.join(","),
      }),
    });

    const response = await fetch(`${API_BASE}/api/people?${searchParams}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch people: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getPeople error:", error);
    throw error;
  }
}

export async function getFilterOptions(): Promise<FilterOptionsResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/people/filter-options`);

    if (!response.ok) {
      throw new Error(`Failed to fetch filter options: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getFilterOptions error:", error);
    throw error;
  }
}
