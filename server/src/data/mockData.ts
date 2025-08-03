import { faker } from "@faker-js/faker";
import { Person } from "@shared/types/person";
import { HOBBIES } from "../constants/hobbies";

export const generateMockPeople = (count: number): Person[] =>
  Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 80 }),
    nationality: faker.location.country(),
    hobbies: faker.helpers.arrayElements(HOBBIES, { min: 0, max: 10 }),
  }));

export const MOCK_PEOPLE = generateMockPeople(1000);
