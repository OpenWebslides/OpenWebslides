import faker from 'faker';

import asyncFetch from '../../app/api/helpers/asyncFetch';

import createDeck from '../../app/api/createDeckApi';

jest.mock('api/helpers/asyncFetch');

describe('Api call to create a new deck', () => {
  it('has a happy path', async () => {
    const title = faker.lorem.sentence();
    const description = faker.lorem.sentence();
    const authorID = faker.random.number();
    const token = faker.random.number();

    asyncFetch.mockReturnValue(200);
    const response = await createDeck(title, description, authorID, token);

    expect(response).toEqual(200);

    const calledUrl = asyncFetch.mock.calls[0][0];

    expect(calledUrl).toEqual('http://localhost:3000/api/decks');

    const body = JSON.stringify({
      data: {
        type: 'decks',
        attributes: {
          name: title,
          description,
        },
        relationships: {
          owner: {
            data: {
              id: authorID,
              type: 'users',
            },
          },
        },
      },
    });

    const requestConfig = asyncFetch.mock.calls[0][1];
    expect(body).toEqual(requestConfig.body);

    expect(requestConfig.method).toEqual('POST');
  });
});
