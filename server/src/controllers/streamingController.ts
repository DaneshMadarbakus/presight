import { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import { streamTextToResponse } from "../services/streamingService";
import { STREAMING_CONFIG } from "../constants/streaming";

export async function streamText(req: Request, res: Response) {
  try {
    const text = faker.lorem.paragraphs(
      STREAMING_CONFIG.PARAGRAPH_COUNT,
      STREAMING_CONFIG.PARAGRAPH_SEPARATOR
    );

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    req.on("close", () => {
      if (!res.writableEnded) {
        console.warn("Client disconnected before streaming completed.");
      }
    });

    streamTextToResponse(text, res, STREAMING_CONFIG.CHAR_DELAY_MS);
  } catch (err) {
    console.error("Error setting up streaming response:", err);
    res.status(500).send("Error occurred while streaming");
  }
}
