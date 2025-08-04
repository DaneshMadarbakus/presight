import { Response } from "express";

export function streamTextToResponse(
  text: string,
  res: Response,
  delayMs: number
) {
  let index = 0;
  let timeoutId: NodeJS.Timeout | null = null;
  let isCleanedUp = false;

  const cleanup = () => {
    if (isCleanedUp) return;
    isCleanedUp = true;

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  res.on("close", cleanup);
  res.on("error", cleanup);
  res.on("finish", cleanup);

  const streamNextChar = () => {
    try {
      if (isCleanedUp || res.destroyed || index >= text.length) {
        cleanup();
        if (!res.destroyed && !res.headersSent) {
          res.end();
        }
        return;
      }

      if (!res.destroyed) {
        res.write(text[index]);
        index++;
      }

      timeoutId = setTimeout(streamNextChar, delayMs);
    } catch (err) {
      console.error("Error during streaming:", err);
      cleanup();
      if (!res.destroyed) {
        res.destroy(err as Error);
      }
    }
  };

  streamNextChar();
}
