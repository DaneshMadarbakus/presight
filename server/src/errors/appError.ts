import { ErrorCode, ErrorMessages, ErrorStatusMap } from "@shared/types/error";

export function createAppError(code: ErrorCode, message?: string) {
  return {
    success: false,
    error: {
      message: message || ErrorMessages[code],
      code,
      status: ErrorStatusMap[code],
      timestamp: new Date().toISOString(),
    },
  };
}

export const AppErrors = {
  validation: (msg?: string) => createAppError(ErrorCode.VALIDATION_ERROR, msg),
  notFound: (resource = "Resource") =>
    createAppError(ErrorCode.NOT_FOUND, `${resource} not found`),
  internal: (msg?: string) =>
    createAppError(ErrorCode.INTERNAL_SERVER_ERROR, msg),
};
