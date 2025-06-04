export interface ErrorResponse {
  success: boolean;
  error: string;
  message?: string;
  validationErrors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly validationErrors?: ValidationError[];

  constructor(message: string, statusCode: number = 500, validationErrors?: ValidationError[]) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.validationErrors = validationErrors;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

export class ValidationApiError extends ApiError {
  constructor(message: string, validationErrors: ValidationError[]) {
    super(message, 400, validationErrors);
    this.name = 'ValidationApiError';
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string = 'Authentication required') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
} 