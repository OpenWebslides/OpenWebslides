import parseValidationErrors from './parseValidationErrors';

export class ServerError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;

    this.stack = (new Error(message)).stack;
    this.name = 'ServerError';
  }
}

export class ClientError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;

    this.stack = (new Error(message)).stack;
    this.name = 'ClientError';
  }
}

export class ValidationError extends Error {
  constructor(message, statusCode, errors) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.validationErrors = parseValidationErrors(errors);

    this.stack = (new Error(message)).stack;
    this.name = 'ValidationError';
  }
}

