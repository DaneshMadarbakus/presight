import { Router } from "express";
import { getPeople, getFilterOptions } from "../controllers/peopleController";
import { asyncHandler } from "src/middleware/errorHandler";

const router = Router();

router.get("/people", asyncHandler(getPeople));
router.get("/people/filter-options", asyncHandler(getFilterOptions));

export default router;
