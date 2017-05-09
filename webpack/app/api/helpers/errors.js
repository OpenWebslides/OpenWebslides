import parseValidationErrors from './parseValidationErrors';

export class ApiError extends Error {
  constructor(message, statusCode) {
    super();

    this.message = message;
    this.statusCode = statusCode;
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
