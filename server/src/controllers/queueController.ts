import { Request, Response } from "express";
import { queueService } from "../services/queueService";
import { AppErrors } from "../errors/appError";

export async function addToQueue(req: Request, res: Response) {
  const data = req.body?.data;

  // Limit data size to prevent memory issues
  if (data && JSON.stringify(data).length > 10000) {
    throw AppErrors.validation("Request data too large (max 10KB)");
  }

  const requestId = queueService.addRequest(data);

  res.json({
    success: true,
    data: {
      status: "pending",
      requestId,
    },
  });
}
