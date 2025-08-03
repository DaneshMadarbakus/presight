import { Router } from "express";
import { getPeople, getFilterOptions } from "../controllers/peopleController";

const router = Router();

router.get("/people", getPeople);
router.get("/people/filter-options", getFilterOptions);

export default router;
