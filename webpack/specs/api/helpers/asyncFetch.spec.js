import faker from 'faker';
import fetchMock from 'fetch-mock';

import asyncFetch from 'api/helpers/asyncFetch';
import helpers from 'specHelpers/setupJest';

describe('async Fetch', () => {
  // Reset fetchMock after each test
  afterEach(() => {
    fetchMock.restore();
  });

  it('can fetch', async () => {
    const fakeUrl = faker.internet.url();
    const fakeResponse = { key: faker.lorem.word() };

    fetchMock.get(fakeUrl, fakeResponse);

    const response = await asyncFetch(fakeUrl);
    const result = await response.json();

    expect(result.key).toEqual(fakeResponse.key);
  });

  it('handles errors', async () => {
    const fakeUrl = faker.internet.url();

    fetchMock.get(fakeUrl, {
      status: 400,
      body: JSON.stringify('Bad data'),
    });

    const outcome = await helpers.syncify(async () => asyncFetch(fakeUrl));

    expect(outcome).toThrow();
  });

  it('displays an error message if one is provided', async () => {
    const fakeUrl = faker.internet.url();

    fetchMock.get(fakeUrl, {
      status: 403,
      body: JSON.stringify('Bad data'),
    });

    const outcome = await helpers.syncify(async () => asyncFetch(fakeUrl));

    expect(outcome).toThrow('Forbidden');
  });
});
