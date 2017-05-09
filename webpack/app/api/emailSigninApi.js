import asyncFetch from './helpers/asyncFetch';
import getBaseRequestConfig from './helpers/baseRequestConfig';

export const SIGNIN_API_URL = 'http://localhost:5000/api/token';

async function emailSignin(email, password) {
  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({
      data: {
        type: 'tokens',
        attributes: {
          email,
          password,
        },
      },
    }),
  });

  const response = await asyncFetch(SIGNIN_API_URL, requestConfig);
  const bearerResponseHeader = response.headers.get('Authorization');
  const authToken = bearerResponseHeader.split(' ')[1];

  return { authToken };
}

export default emailSignin;
