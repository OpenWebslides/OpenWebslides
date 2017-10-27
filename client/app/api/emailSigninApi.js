import ApiRequest from './helpers/apiHelper';

async function emailSignin(email, password) {
  const request = new ApiRequest();
  request.setEndpoint('token').setMethod('POST').setBody({
    data: {
      type: 'tokens',
      attributes: {
        email,
        password,
      },
    },
  });

  const response = await request.executeRequest();
  const responseBody = await response.json();

  const id = responseBody.data.id;
  const bearerResponseHeader = response.headers.get('Authorization');

  const authToken = bearerResponseHeader.split(' ')[1];
  const {
    email: userEmail,
    firstName,
  } = responseBody.data.attributes;

  return { authToken, id, userEmail, firstName };
}

export default emailSignin;
