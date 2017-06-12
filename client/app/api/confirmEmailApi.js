import asyncFetch from 'api/helpers/asyncFetch';
import getBaseRequestConfig from 'api/helpers/baseRequestConfig';

export const CONFIRM_EMAIL_API_URL = 'http://localhost:3000/api/confirmation';

async function confirmEmail(confirmationToken) {
  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({
      data: {
        type: 'confirmations',
        attributes: {
          confirmationToken,
        },
      },
    }),
  });

  return asyncFetch(CONFIRM_EMAIL_API_URL, requestConfig);
}

export default confirmEmail;
