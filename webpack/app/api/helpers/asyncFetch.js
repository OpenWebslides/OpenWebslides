import { ApiError, ValidationError } from './errors';

export default async function asyncFetch(url, requestConfig = {}) {
  const response = await fetch(url, requestConfig);
  const responseBody = await response.json();
  const { statusText, status } = response;

  switch (status) {
    case 400:
    case 401:
    case 403:
      throw new ApiError(statusText, status);
    case 422:
      throw new ValidationError(statusText, status, responseBody.errors);
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 505:
      throw new ApiError(statusText, status);
    default:
      return response;
  }
}
