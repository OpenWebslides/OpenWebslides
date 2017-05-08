import parseValidationErrors from './parseValidationErrors';

export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.stack = new Error(message).stack;
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message, statusCode, errors) {
    super(message, statusCode);

    this.validationErrors = parseValidationErrors(errors);
    this.name = 'ValidationError';
  }
}
