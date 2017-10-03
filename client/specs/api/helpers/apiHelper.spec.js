import faker from 'faker';
import ApiRequest from 'api/helpers/apiHelper';

describe('ApiHelper constructor', () => {
  it('builds a basic request', () => {
    const testEmpty = new ApiRequest();

    expect(testEmpty.url).toEqual('http://owsdev.ugent.be/api/');
    expect(testEmpty.headers).toEqual({
      'Content-Type': 'application/vnd.api+json',
    });
  });

  it('Can chain setter calls', () => {
    const testRequest = new ApiRequest();

    const randomUrl = faker.internet.url();
    const randomBody = faker.lorem.paragraph();
    const randomEndpoint = faker.lorem.word();
    const randomHeaderKey = 'testKey';
    const randomHeaderVal = faker.lorem.word();
    testRequest
      .setUrl(randomUrl)
      .setEndpoint(randomEndpoint)
      .setMethod('POST')
      .setBody(randomBody)
      .addHeader(randomHeaderKey, randomHeaderVal);

    expect(testRequest.url).toEqual(randomUrl);
    expect(testRequest.body).toEqual(randomBody);
    expect(testRequest.method).toEqual('POST');
    expect(testRequest.headers).toEqual({
      'Content-Type': 'application/vnd.api+json',
      testKey: randomHeaderVal,
    });
    expect(testRequest.parameters).toEqual({});
  });

  it('Throws Errors if wrong operations are performed', () => {
    const testRequest = new ApiRequest();

    testRequest.setMethod('GET');

    expect(() => testRequest.setBody('body')).toThrowError("Can't add a body to a GET request.");

    expect(() => testRequest.addHeader('Authentication', 'bla')).toThrowError(
      'Invalid header \'Authentication\': No need to specify an authentication header, it\'s included by default.',
    );

    testRequest.setMethod('POST');
    expect(() => testRequest.addParameter('name', 'val')).toThrowError('Can\'t add url parameters to a POST request!');
    expect(() => testRequest.setMethod('wrong')).toThrowError(
      'Invalid request method: \'wrong\'. Must be one of (\'GET\', \'POST\', \'PUT\', \'PATCH\', \'DELETE\')',
    );
  });
});
