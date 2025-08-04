import {
  Person,
  PaginatedResponse,
  FilterOptionsResponse,
} from "@shared/types/person";

const API_BASE = "http://localhost:4000";

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
    const data = await response.json();

    if (data.success === false) {
      throw new Error(data.error.message);
    }

    return data.data;
  } catch (error) {
    console.error("getPeople error:", error);
    throw error;
  }
}

export async function getFilterOptions(): Promise<FilterOptionsResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/people/filter-options`);
    const data = await response.json();

    if (data.success === false) {
      throw new Error(data.error.message);
    }

    return data.data;
  } catch (error) {
    console.error("getFilterOptions error:", error);
    throw error;
  }
}
