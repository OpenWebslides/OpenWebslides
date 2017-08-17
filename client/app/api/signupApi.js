import ApiRequest from './helpers/apiHelper';

async function signup(email, password, firstName, lastName, tosAccepted) {
  const request = new ApiRequest();

  request.setEndpoint('users').setMethod('POST').setBody({
    data: {
      type: 'users',
      attributes: {
        email,
        password,
        firstName,
        lastName,
        tosAccepted,
      },
    },
  });

  return request.executeRequest();
}

export default signup;
