import { Request, Response } from "express";
import { PersonFilters } from "@shared/types/person";
import { getPaginatedPeople } from "../services/peopleService";
import { getFilterOptions as getFilterOptionsService } from "../services/filterService";
import { AppErrors } from "../errors/appError";

// Async controller for the sake of the test.
// This simulates a real-world async DB/API call and allows error handling via try/catch or async middleware.
// Even though getPaginatedPeople is currently synchronous, we use `await` for consistency with typical Express patterns.
export async function getPeople(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  if (page < 1 || limit < 1 || limit > 100) {
    throw AppErrors.validation("Invalid pagination parameters");
  }

  const filters: PersonFilters = {
    search: req.query.search as string,
    nationality: req.query.nationality
      ? (req.query.nationality as string).split(",")
      : undefined,
    hobbies: req.query.hobbies
      ? (req.query.hobbies as string).split(",")
      : undefined,
  };

  const result = await getPaginatedPeople(page, limit, filters);

  res.json({
    success: true,
    data: result,
  });
}

// Async controller for the sake of the test.
// Although getFilterOptionsService is synchronous, we use `await` to enable future error handling and realistic async structure.
export async function getFilterOptions(_req: Request, res: Response) {
  const result = await getFilterOptionsService();

  res.json({
    success: true,
    data: result,
  });
}
