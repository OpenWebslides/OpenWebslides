import ApiRequest from './helpers/apiHelper';

async function resetPassword(email) {
  const request = new ApiRequest();
  request.setEndpoint('password').setMethod('POST').setBody({
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
