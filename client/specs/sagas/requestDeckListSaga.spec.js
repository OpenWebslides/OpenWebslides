import { call, put } from 'redux-saga/effects';
import faker from 'faker';

import { REQUEST_DECK_LIST_SUCCESS, REQUEST_DECK_LIST_FAILURE } from 'actions/deckManagementActions';

import requestUserDecksCall from 'api/requestUserDecksCall';

import { requestDeckListFlow } from 'sagas/deck-management/requestDeckListSaga';

function fakeResponseElement() {
  const id = faker.random.number();
  return {
    id,
    type: 'decks',
    links: {
      self: `http://localhost:3000/api/decks/${id}`,
    },
    attributes: {
      name: faker.lorem.sentence(),
      state: 'public_access',
      description: faker.lorem.sentence(),
      template: 'shower-ows',
    },
    relationships: {
      owner: {
        links: {
          self: `http://localhost:3000/api/decks/${id}/relationships/owner`,
          related: `http://localhost:3000/api/decks/${id}/owner`,
        },
      },
      collaborators: {
        links: {
          self: `http://localhost:3000/api/decks/${id}/relationships/collaborators`,
          related: `http://localhost:3000/api/decks/${id}/collaborators`,
        },
      },
    },
  };
}
function fakeResponseList(amount) {
  let res = [];
  for (let i = 0; i < amount; i += 1) {
    res = res.concat(fakeResponseElement());
  }
  return res;
}

describe('Request for deck list Saga', () => {
  describe('Request list of own decks flow', () => {
    const dummyError = { message: 'blablabla' };
    const dummyResponse = fakeResponseList(12);

    it('has a happy path', () => {
      const generator = requestDeckListFlow({
        meta: 'someID',
      });
      expect(generator.next().value).toEqual(call(requestUserDecksCall, 'someID'));

      const resultListOfDecks = [];

      for (let i = 0; i < 12; i += 1) {
        resultListOfDecks.push({
          id: dummyResponse[i].id,
          name: dummyResponse[i].attributes.name,
          description: dummyResponse[i].attributes.description,
        });
      }
      expect(generator.next(dummyResponse).value).toEqual(
        put({
          type: REQUEST_DECK_LIST_SUCCESS,
          payload: {
            listOfDecks: resultListOfDecks,
          },
        }),
      );

      expect(generator.next().done).toBeTruthy();
    });
    it('throws an error if the list is undefined', () => {
      const generator = requestDeckListFlow({
        meta: 'someID',
      });
      expect(generator.next().value).toEqual(call(requestUserDecksCall, 'someID'));

      expect(generator.throw(new Error('Received undefined list.')).value).toEqual(
        put({
          type: REQUEST_DECK_LIST_FAILURE,
          payload: {
            message: 'Received undefined list.',
          },
        }),
      );
      expect(generator.next().done).toBeTruthy();
    });

    it('throws an error if the call returns an error', () => {
      const generator = requestDeckListFlow({
        meta: 'someID',
      });
      expect(generator.next().value).toEqual(call(requestUserDecksCall, 'someID'));

      expect(generator.throw(dummyError).value).toEqual(
        put({
          type: REQUEST_DECK_LIST_FAILURE,
          payload: dummyError,
        }),
      );

      expect(generator.next().done).toBeTruthy();
    });
  });
});
