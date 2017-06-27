import faker from 'faker';
import fetchMock from 'fetch-mock';

import asyncFetch from 'api/helpers/asyncFetch';

describe('asyncFetch function', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('can fetch', async () => {
    const url = faker.internet.url();
    const response = { key: 'value' };

    fetchMock.get(url, response);

    const outcome = await asyncFetch(url);
    const outcomeJson = await outcome.json();

    expect(outcomeJson).toEqual(response);
  });

  it('handles errors', async () => {
    const url = faker.internet.url();
    const response = {
      status: 400,
      body: JSON.stringify('Bad data'),
    };

    fetchMock.get(url, response);

    expect.assertions(1);
    try {
      await asyncFetch(url);
    } catch (error) {
      expect(error.name).toEqual('ApiError');
    }
  });

  it('handles validation errors', async () => {
    const url = faker.internet.url();
    const status = 422;
    const body = {
      errors: [
        {
          title: 'has already been taken',
          detail: 'email - has already been taken',
        },
      ],
    };

    fetchMock.get(url, {
      statusText: 'Unprocessable Entity',
      status,
      body,
    });

    expect.assertions(2);
    try {
      await asyncFetch(url);
    } catch (e) {
      expect(e.name).toEqual('ValidationError');
      expect(e.validationErrors).toEqual({
        email: 'Email has already been taken',
      });
    }
  });
});
