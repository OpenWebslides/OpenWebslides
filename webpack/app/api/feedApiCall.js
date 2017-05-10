
import asyncFetch from 'api/helpers/asyncFetch';
import getBaseRequestConfig from 'api/helpers/baseRequestConfig';

async function getNotifications() {
  const NOTIFICATIONS_API_URL = 'http://localhost:5000/api/notifications?sort=-createdAt';

  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'GET',
  });

  const response = await asyncFetch(NOTIFICATIONS_API_URL, requestConfig);
  const responseBody = await response.json();

  return responseBody.data;
}

export default getNotifications;
