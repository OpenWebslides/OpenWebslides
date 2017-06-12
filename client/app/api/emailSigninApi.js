import asyncFetch from './helpers/asyncFetch';
import getBaseRequestConfig from './helpers/baseRequestConfig';

export const SIGNIN_API_URL = 'http://localhost:3000/api/token';

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
  const responseBody = await response.json();
  const bearerResponseHeader = response.headers.get('Authorization');

  const authToken = bearerResponseHeader.split(' ')[1];
  const { firstName } = responseBody.data.attributes;

  return { authToken, firstName };
}

export default emailSignin;
