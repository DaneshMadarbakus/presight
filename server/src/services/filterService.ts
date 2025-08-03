import { FilterOptionsResponse } from "@shared/types/person";
import { MOCK_PEOPLE } from "../data/mockData";

export const getFilterOptions = (): FilterOptionsResponse => {
  const hobbyCount = new Map<string, number>();
  const nationalityCount = new Map<string, number>();

  MOCK_PEOPLE.forEach((person) => {
    person.hobbies.forEach((hobby) => {
      hobbyCount.set(hobby, (hobbyCount.get(hobby) || 0) + 1);
    });

    nationalityCount.set(
      person.nationality,
      (nationalityCount.get(person.nationality) || 0) + 1
    );
  });

  const topHobbies = Array.from(hobbyCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  const topNationalities = Array.from(nationalityCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  return {
    hobbies: topHobbies,
    nationalities: topNationalities,
  };
};
