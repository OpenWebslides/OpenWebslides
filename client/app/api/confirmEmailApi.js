import ApiRequest from './helpers/apiHelper';

export const CONFIRM_EMAIL_API_URL = 'http://localhost:5000/api/confirmation';

async function confirmEmail(confirmationToken) {
  const request = new ApiRequest();

  request
    .setHost('localhost')
    .setPort(5000)
    .setEndpoint('api/confirmation')
    .setMethod('POST')
    .setBody({
      data: {
        type: 'confirmations',
        attributes: {
          confirmationToken,
        },
      },
    });

  return request.executeRequest();
}

export default confirmEmail;
