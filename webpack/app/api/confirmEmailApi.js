import asyncFetch from 'api/helpers/asyncFetch';
import getBaseRequestConfig from 'api/helpers/baseRequestConfig';

async function confirmEmail(confirmationToken) {
  const CONFIRM_EMAIL_API_URL = 'http://localhost:5000/api/confirmation';

  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify(
      {
        data: {
          type: 'confirmations',
          attributes: {
            'confirmation-token': confirmationToken,
          },
        },
      }),
  });

  const response = await asyncFetch(CONFIRM_EMAIL_API_URL, requestConfig);

  return response.json();
}

export default confirmEmail;
