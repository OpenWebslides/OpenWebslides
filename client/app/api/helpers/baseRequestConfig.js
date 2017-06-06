// Base configuration for API calls
export default function getBaseRequestConfig() {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },
  };
}
