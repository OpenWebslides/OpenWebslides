import asyncFetch from 'api/helpers/asyncFetch';
import getBaseRequestConfig from 'api/helpers/baseRequestConfig';

async function resetPassword(resetPasswordToken, password) {
  const RESET_PASSWORD_API_URL = 'http://localhost:5000/api/password';

  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'PUT',
    body: JSON.stringify(
      {
        data: {
          type: 'passwords',
          id: '',
          attributes: {
            resetPasswordToken,
            password,
          },
        },
      }),
  });

  return asyncFetch(RESET_PASSWORD_API_URL, requestConfig);
}

export default resetPassword;
