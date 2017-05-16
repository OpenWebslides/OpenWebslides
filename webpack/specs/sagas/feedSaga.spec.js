import { call, put } from 'redux-saga/effects';
import faker from 'faker';

import { types } from 'actions/feedActions';
import feedApiCall from 'api/feedApiCall';

import { getFeedFlow } from 'sagas/feed/feedSaga';

describe('Feed Saga', () => {
  describe('Request initial list of notifications flow', () => {
    const dummyError = { message: 'blablabla' };
    const dummyResponse = [
      {
        id: faker.random.number(),
        type: 'notifications',
        links: {
          self: 'http://localhost:5000/api/notifications/1',
        },
        attributes: {
          eventType: faker.random.arrayElement(['DECK_CREATED', 'DECK_UPDATED']),
          createdAt: faker.random.number(),
          userName: faker.name.findName(),
          deckName: faker.lorem.sentence,
        },
        relationships: {
          user: {
            links: {
              self: 'http://localhost:5000/api/notifications/1/relationshi0ps/user',
              related: 'http://localhost:5000/api/notifications/1/user',
            },
            data: {
              type: 'users',
              id: '1',
            },
          },
          deck: {
            links: {
              self: 'http://localhost:5000/api/notifications/1/relationships/deck',
              related: 'http://localhost:5000/api/notifications/1/deck',
            },
            data: {
              type: 'decks',
              id: '1',
            },
          },
        },
      },
    ];

    it('has a happy path', () => {
      const generator = getFeedFlow();
      expect(
        generator.next().value,
      ).toEqual(call(feedApiCall));

      expect(generator.next(dummyResponse).value)
        .toEqual(put({
          type: types.REQUEST_FEED_NOTIFICATIONS_SUCCESS,
          payload: {
            listOfNotifications: [{
              timestamp: dummyResponse[0].attributes.createdAt,
              type: dummyResponse[0].attributes.eventType,
              targetDeck: dummyResponse[0].attributes.deckName,
              concernedUser: dummyResponse[0].attributes.userName,
            }],
          },
        }));


      expect(generator.next().done).toBeTruthy();
    });
    it('throws an error if the list is undefined', () => {
      const generator = getFeedFlow();
      expect(
        generator.next().value,
      ).toEqual(call(feedApiCall));

      expect(generator.throw(new Error('Received undefined list.')).value)
        .toEqual(put({
          type: types.RECEPTION_ERROR,
          payload: {
            message: 'Received undefined list.',
          },
        }));

      expect(generator.next().done).toBeTruthy();
    });

    it('throws an error if the call returns an error', () => {
      const generator = getFeedFlow();
      expect(
        generator.next().value,
      ).toEqual(call(feedApiCall));

      expect(generator.throw(dummyError).value)
        .toEqual(put({
          type: types.RECEPTION_ERROR,
          payload: dummyError,
        }));

      expect(generator.next().done).toBeTruthy();
    });
  });
});
