import asyncFetch from 'api/helpers/asyncFetch';
import getBaseRequestConfig from 'api/helpers/baseRequestConfig';

async function resetPassword(email) {
  const REQUEST_PASSWORD_RESET_API_URL = 'http://localhost:5000/api/password';

  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify(
      {
        data: {
          type: 'passwords',
          attributes: {
            email,
          },
        },
      }),
  });

  return asyncFetch(REQUEST_PASSWORD_RESET_API_URL, requestConfig);
}

export default resetPassword;
