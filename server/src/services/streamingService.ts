import { Response } from "express";

export function streamTextToResponse(
  text: string,
  res: Response,
  delayMs: number
) {
  let index = 0;

  const streamNextChar = () => {
    try {
      if (index >= text.length) {
        res.end();
        return;
      }

      res.write(text[index]);
      index++;

      setTimeout(streamNextChar, delayMs);
    } catch (err) {
      console.error("Error during streaming:", err);
      res.destroy(err as Error);
    }
  };

  streamNextChar();
}
