import ApiRequest from './helpers/apiHelper';

export const RESET_PASSWORD_API_URL = 'http://localhost:5000/api/password';

async function resetPassword(resetPasswordToken, password) {
  const request = new ApiRequest();

  request
    .setHost('localhost')
    .setPort(5000)
    .setEndpoint('api/password')
    .setMethod('PUT')
    .setBody({
      data: {
        type: 'passwords',
        id: '',
        attributes: {
          resetPasswordToken,
          password,
        },
      },
    });

  return request.executeRequest();
}

export default resetPassword;
