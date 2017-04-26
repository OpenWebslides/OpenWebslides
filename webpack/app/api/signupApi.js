import asyncFetch from 'api/helpers/asyncFetch';
import getBaseRequestConfig from 'api/helpers/baseRequestConfig';

async function signup(email, password) {
  const SIGNUP_API_URL = 'http://localhost:5000/api/users';

  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({
      data: {
        type: 'users',
        attributes: {
          email,
          password,
          name: 'Just a name',
        },
      },
    }),
  });

  const response = await asyncFetch(SIGNUP_API_URL, requestConfig);

  return response.json();
}

export default signup;
