import { Router } from "express";
import { addToQueue } from "../controllers/queueController";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();

router.post("/queue", asyncHandler(addToQueue));

export default router;
