import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../errors/appError";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err?.success === false && err.error) {
    return res.status(err.error.status).json({
      ...err,
      error: {
        ...err.error,
        path: req.path,
      },
    });
  }

  const fallbackError = AppErrors.internal();
  console.error("Unhandled error:", err);
  return res.status(fallbackError.error.status).json(fallbackError);
}

export function asyncHandler<T extends Request, U extends Response>(
  fn: (req: T, res: U, next: NextFunction) => Promise<any>
) {
  return (req: T, res: U, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const error = AppErrors.notFound("Route");
  next(error);
}
