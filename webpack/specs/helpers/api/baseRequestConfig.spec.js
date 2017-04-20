import getBaseRequestConfig from 'helpers/api/baseRequestConfig';

describe('Base Request Config', () => {
  it('returns a basic default config', () => {
    const result = getBaseRequestConfig();

    expect(result).toEqual({
      method: 'GET',
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
    });
  });
});
