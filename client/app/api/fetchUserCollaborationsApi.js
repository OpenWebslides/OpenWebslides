import ApiRequest from './helpers/apiHelper';

async function fetchUserCollaborations(userId) {
  const request = new ApiRequest();
  request.setMethod('GET').setEndpoint(`users/${userId}/relationships/collaborations`);

  const response = await request.executeRequest();

  const responseBody = await response.json();

  return responseBody;
}

export default fetchUserCollaborations;
