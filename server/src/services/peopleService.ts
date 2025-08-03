import { Person, PersonFilters, PaginatedResponse } from "@shared/types/person";
import { MOCK_PEOPLE } from "../data/mockData";

const applyFilters = (people: Person[], filters: PersonFilters): Person[] =>
  people.filter((person) => {
    // Filter search by first or last name
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const nameMatch =
        person.first_name.toLowerCase().includes(searchLower) ||
        person.last_name.toLowerCase().includes(searchLower);
      if (!nameMatch) return false;
    }

    // Nationality filter
    if (
      filters.nationality &&
      filters.nationality.length > 0 &&
      !filters.nationality.some(
        (n) => n.toLowerCase() === person.nationality.toLowerCase()
      )
    ) {
      return false;
    }

    // Hobby filter
    if (filters.hobbies && filters.hobbies.length > 0) {
      const hasHobby = filters.hobbies.some((hobby) =>
        person.hobbies.includes(hobby)
      );
      if (!hasHobby) return false;
    }

    return true;
  });

export const getPaginatedPeople = (
  page: number = 1,
  limit: number = 20,
  filters: PersonFilters = {}
): PaginatedResponse<Person> => {
  const filteredPeople = applyFilters(MOCK_PEOPLE, filters);
  const total = filteredPeople.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const data = filteredPeople.slice(startIndex, endIndex);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};
