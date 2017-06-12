import asyncFetch from 'api/helpers/asyncFetch';
import getBaseRequestConfig from 'api/helpers/baseRequestConfig';

export const SIGNUP_API_URL = 'http://localhost:3000/api/users';

async function signup(email, password, firstName, lastName) {
  const baseRequestConfig = getBaseRequestConfig();

  const requestConfig = Object.assign({}, baseRequestConfig, {
    method: 'POST',
    body: JSON.stringify({
      data: {
        type: 'users',
        attributes: {
          email,
          password,
          firstName,
          lastName,
        },
      },
    }),
  });

  return asyncFetch(SIGNUP_API_URL, requestConfig);
}

export default signup;
