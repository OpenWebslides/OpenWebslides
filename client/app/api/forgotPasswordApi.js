import ApiRequest from './helpers/apiHelper';

export const FORGOT_PASSWORD_API_URL = 'http://localhost:3000/api/password';

async function resetPassword(email) {
  const request = new ApiRequest();
  request.setEndpoint('api/password').setMethod('POST').setBody({
    data: {
      type: 'passwords',
      attributes: {
        email,
      },
    },
  });

  return request.executeRequest();
}

export default resetPassword;
