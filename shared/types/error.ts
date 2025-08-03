export interface AppErrorResponse {
  success: false;
  error: {
    message: string;
    code: ErrorCode;
    status: number;
    timestamp: string;
    path?: string;
  };
}

export interface AppSuccessResponse<T = unknown> {
  success: true;
  data: T;
}

export type ApiResponse<T = unknown> = AppSuccessResponse<T> | AppErrorResponse;

export enum ErrorCode {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export const ErrorStatusMap: Record<ErrorCode, number> = {
  [ErrorCode.VALIDATION_ERROR]: 400,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.INTERNAL_SERVER_ERROR]: 500,
};

export const ErrorMessages: Record<ErrorCode, string> = {
  [ErrorCode.VALIDATION_ERROR]: "Invalid data provided",
  [ErrorCode.NOT_FOUND]: "Resource not found",
  [ErrorCode.INTERNAL_SERVER_ERROR]: "Something went wrong",
};
