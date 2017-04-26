// Base config for api calls to server
export default function getBaseRequestConfig() {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },
  };
}
