import faker from 'faker';

import asyncFetch from '../../app/api/helpers/asyncFetch';

import requestUserDecks from '../../app/api/requestUserDecksCall';

jest.mock('api/helpers/asyncFetch');

describe('get user decks Api Call', () => {
  it('has a happy path', async () => {
    asyncFetch.mockReturnValue({
      status: 200,
      json: () => ({ data: 'sample' }),
    });

    const dummyId = faker.random.number();
    const response = await requestUserDecks(dummyId);

    expect(response).toEqual('sample');

    const calledUrl = asyncFetch.mock.calls[0][0];

    expect(calledUrl).toEqual(
      `http://localhost:3000/api/users/${dummyId}/decks`,
    );

    const requestConfig = asyncFetch.mock.calls[0][1];
    expect(requestConfig.method).toEqual('GET');
  });
});
