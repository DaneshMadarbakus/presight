import { Router } from "express";
import { streamText } from "../controllers/streamingController";
import { asyncHandler } from "../middleware/errorHandler";

const router = Router();

router.get("/streaming/text", asyncHandler(streamText));

export default router;
