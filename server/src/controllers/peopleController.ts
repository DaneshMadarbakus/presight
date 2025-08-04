import { Request, Response } from "express";
import { PersonFilters } from "@shared/types/person";
import { getPaginatedPeople } from "../services/peopleService";
import { getFilterOptions as getFilterOptionsService } from "../services/filterService";
import { AppErrors } from "../errors/appError";

// Async controller for the sake of the test.
// This simulates a real-world async DB/API call and allows error handling via try/catch or async middleware.
// Even though getPaginatedPeople is currently synchronous, we use `await` for consistency with typical Express patterns.
export async function getPeople(req: Request, res: Response) {
  const pageQuery = req.query.page;
  const limitQuery = req.query.limit;
  const searchQuery = req.query.search;

  const page = typeof pageQuery === "string" ? parseInt(pageQuery) : 1;
  const limit = typeof limitQuery === "string" ? parseInt(limitQuery) : 20;

  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1 || limit > 100) {
    throw AppErrors.validation("Invalid pagination parameters");
  }

  // Sanitize inputs
  const search =
    typeof searchQuery === "string"
      ? searchQuery.trim().slice(0, 100) // Limit length and trim
      : undefined;

  const nationality =
    typeof req.query.nationality === "string"
      ? req.query.nationality
          .split(",")
          .map((n) => n.trim())
          .filter((n) => n.length > 0)
          .slice(0, 10) // Limit to 10 items
      : undefined;

  const hobbies =
    typeof req.query.hobbies === "string"
      ? req.query.hobbies
          .split(",")
          .map((h) => h.trim())
          .filter((h) => h.length > 0)
          .slice(0, 10) // Limit to 10 items
      : undefined;

  const filters: PersonFilters = {
    search,
    nationality,
    hobbies,
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
