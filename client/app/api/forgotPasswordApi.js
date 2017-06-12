import asyncFetch from 'api/helpers/asyncFetch';
import getBaseRequestConfig from 'api/helpers/baseRequestConfig';

export const FORGOT_PASSWORD_API_URL = 'http://localhost:3000/api/password';

async function resetPassword(email) {
  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({
      data: {
        type: 'passwords',
        attributes: {
          email,
        },
      },
    }),
  });

  return asyncFetch(FORGOT_PASSWORD_API_URL, requestConfig);
}

export default resetPassword;
