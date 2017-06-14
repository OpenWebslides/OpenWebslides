import faker from 'faker';

import asyncFetch from '../../app/api/helpers/asyncFetch';
import deleteDeck from '../../app/api/deleteDeckApi';

jest.mock('api/helpers/asyncFetch');

describe('Api call to delete a deck', () => {
  it('has a happy path', async () => {
    const deckId = faker.random.number();
    const token = faker.random.number();
    asyncFetch.mockReturnValue(200);
    const response = await deleteDeck(deckId, token);

    expect(response).toEqual(200);

    const calledUrl = asyncFetch.mock.calls[0][0];

    expect(calledUrl).toEqual(`http://localhost:5000/api/decks/${deckId}`);

    const requestConfig = asyncFetch.mock.calls[0][1];

    expect(requestConfig.method).toEqual('DELETE');
  });
});
