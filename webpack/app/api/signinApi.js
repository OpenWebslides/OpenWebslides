import asyncFetch from 'api/helpers/asyncFetch';
import getBaseRequestConfig from 'api/helpers/baseRequestConfig';

async function signin(email, password) {
  const SIGNIN_API_URL = 'http://localhost:5000/api/token';

  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify(
      {
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
  const firstName = responseBody.data.attributes.firstName;

  return { authToken, firstName };
}

export default signin;
