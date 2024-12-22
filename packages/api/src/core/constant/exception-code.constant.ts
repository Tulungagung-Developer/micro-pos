export enum ExceptionCode {
  // Authentication & Authorization
  UNAUTHORIZED = 'UNAUTHORIZED',
  UNAUTHORIZED_MISSING_TOKEN = 'UNAUTHORIZED_MISSING_TOKEN',
  UNAUTHORIZED_INVALID_TOKEN = 'UNAUTHORIZED_INVALID_TOKEN',
  UNAUTHORIZED_USER_NOT_FOUND = 'UNAUTHORIZED_USER_NOT_FOUND',
  FORBIDDEN = 'FORBIDDEN',

  // Entity related
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
  ENTITY_ALREADY_EXISTS = 'ENTITY_ALREADY_EXISTS',

  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',

  // Server errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
}

export const ExceptionErrorMessages: Record<ExceptionCode, string> = {
  [ExceptionCode.UNAUTHORIZED]: 'Unauthorized access',
  [ExceptionCode.UNAUTHORIZED_MISSING_TOKEN]: 'Authentication token is missing',
  [ExceptionCode.UNAUTHORIZED_INVALID_TOKEN]: 'Invalid authentication token',
  [ExceptionCode.UNAUTHORIZED_USER_NOT_FOUND]: 'User not found for the provided token',
  [ExceptionCode.FORBIDDEN]: 'Access forbidden',
  [ExceptionCode.ENTITY_NOT_FOUND]: 'entity not found',
  [ExceptionCode.ENTITY_ALREADY_EXISTS]: 'entity  exists',
  [ExceptionCode.VALIDATION_ERROR]: 'Validation error occurred',
  [ExceptionCode.INVALID_INPUT]: 'Invalid input provided',
  [ExceptionCode.INTERNAL_SERVER_ERROR]: 'Internal server error',
  [ExceptionCode.DATABASE_ERROR]: 'Database error occurred',
  [ExceptionCode.EXTERNAL_SERVICE_ERROR]: 'External service error',
};
