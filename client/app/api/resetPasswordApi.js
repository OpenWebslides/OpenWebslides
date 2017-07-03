import ApiRequest from './helpers/apiHelper';

async function resetPassword(resetPasswordToken, password) {
  const request = new ApiRequest();

  request.setEndpoint('password').setMethod('PUT').setBody({
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
