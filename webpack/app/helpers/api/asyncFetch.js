import ApiCallError from 'errors/apiCallError';

async function asyncFetch(url, requestConfig = {}) {
  const response = await fetch(url, requestConfig);

  const isSuccess = response.status >= 200 && response.status < 300;

  if (isSuccess) {
    return response;
  }

  throw new ApiCallError(
    response.statusText,
    response.status,
  );
}

export default asyncFetch;
