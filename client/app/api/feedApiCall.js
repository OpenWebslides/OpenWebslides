import asyncFetch from 'api/helpers/asyncFetch';
import getBaseRequestConfig from 'api/helpers/baseRequestConfig';

async function requestFeedNotifications(offset = 0) {
  const NOTIFICATIONS_API_URL =
    'http://localhost:3000/api/notifications?sort=-createdAt';
  const PARAMETER = `&page[offset]=${offset}`;

  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'GET',
  });

  const response = await asyncFetch(
    NOTIFICATIONS_API_URL + PARAMETER,
    requestConfig,
  );
  const responseBody = await response.json();

  return responseBody.data;
}

export default requestFeedNotifications;
