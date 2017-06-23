import ApiRequest from './helpers/apiHelper';

export const SIGNUP_API_URL = 'http://localhost:5000/api/users';

async function signup(email, password, firstName, lastName) {
  const request = new ApiRequest();

  request
    .setHost('localhost')
    .setPort(5000)
    .setEndpoint('api/users')
    .setMethod('POST')
    .setBody({
      data: {
        type: 'users',
        attributes: {
          email,
          password,
          firstName,
          lastName,
        },
      },
    });

  return request.executeRequest();
}

export default signup;
