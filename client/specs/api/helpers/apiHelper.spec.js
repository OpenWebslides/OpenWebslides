import ApiRequest from 'api/helpers/apiHelper';

describe('ApiHelper constructor', () => {
  it('builds a basic request', () => {
    const testEmpty = new ApiRequest();

    expect(testEmpty.host).toEqual('localhost');
    expect(testEmpty.port).toEqual(5000);
    expect(testEmpty.headers).toEqual({
      'Content-Type': 'application/vnd.api+json',
    });
  });
});
