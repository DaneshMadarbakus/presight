import { Request, Response } from "express";
import { PersonFilters } from "@shared/types/person";
import { getPaginatedPeople } from "../services/peopleService";
import { getFilterOptions as getFilterOptionsService } from "../services/filterService";

export const getPeople = (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  const filters: PersonFilters = {
    search: req.query.search as string,
    nationality: req.query.nationality
      ? (req.query.nationality as string).split(",")
      : undefined,
    hobbies: req.query.hobbies
      ? (req.query.hobbies as string).split(",")
      : undefined,
  };

  const result = getPaginatedPeople(page, limit, filters);
  res.json(result);
};

export const getFilterOptions = (req: Request, res: Response) => {
  const result = getFilterOptionsService();
  res.json(result);
};
