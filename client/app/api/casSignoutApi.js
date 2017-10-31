import ApiRequest from './helpers/apiHelper';

async function casSignout() {
  const request = new ApiRequest();
  request.setMethod('GET')
         .setUrl('https://login.ugent.be/')
         .setEndpoint('logout')
         .setMode('no-cors');

  const response = await request.executeRequest();
}

export default casSignout;
