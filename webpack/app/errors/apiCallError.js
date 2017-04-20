class ApiCallError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;

    this.stack = (new Error(message)).stack;
    this.name = 'ApiCallError';
  }
}

export default ApiCallError;
