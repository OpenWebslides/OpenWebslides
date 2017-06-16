import { call, put } from 'redux-saga/effects';
import faker from 'faker';

import {
  REQUEST_FEED_NOTIFICATIONS_SUCCESS,
  REQUEST_FEED_NOTIFICATIONS_FAILURE,
} from 'actions/feedActions';
import feedApiCall from 'api/feedApiCall';

import { getFeedNotificationsFlow } from 'sagas/feed/requestFeedNotificationsSaga';

function fakeResponseElement() {
  const id = faker.random.number();
  return [
    {
      id,
      type: 'notifications',
      links: {
        self: `http://localhost:5000/api/notifications/${id}`,
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
            self: `http://localhost:5000/api/notifications/${id}/relationships/user'`,
            related: 'http://localhost:5000/api/notifications/1/user',
          },
          data: {
            type: 'users',
            id: '1',
          },
        },
        deck: {
          links: {
            self:
              'http://localhost:5000/api/notifications/1/relationships/deck',
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
}
function fakeResponseList(amount) {
  let res = [];
  for (let i = 0; i < amount; i += 1) {
    res = res.concat(fakeResponseElement());
  }
  return res;
}

describe('Feed Saga', () => {
  describe('Request initial list of notifications flow', () => {
    const dummyError = { message: 'blablabla' };
    const dummyResponse = fakeResponseList(12);

    it('has a happy path', () => {
      const generator = getFeedNotificationsFlow({
        meta: 12,
      });
      expect(generator.next().value).toEqual(call(feedApiCall, 12));

      const resultListOfNotifications = [];
      for (let i = 0; i < 12; i += 1) {
        resultListOfNotifications.push({
          id: dummyResponse[i].id,
          timestamp: dummyResponse[i].attributes.createdAt,
          type: dummyResponse[i].attributes.eventType,
          targetDeck: dummyResponse[i].attributes.deckName,
          concernedUser: dummyResponse[i].attributes.userName,
        });
      }
      expect(generator.next(dummyResponse).value).toEqual(
        put({
          type: REQUEST_FEED_NOTIFICATIONS_SUCCESS,
          payload: {
            listOfNotifications: resultListOfNotifications,
          },
        }),
      );

      expect(generator.next().done).toBeTruthy();
    });
    it('throws an error if the list is undefined', () => {
      const generator = getFeedNotificationsFlow({
        meta: 12,
      });
      expect(generator.next().value).toEqual(call(feedApiCall, 12));

      expect(
        generator.throw(new Error('Received undefined list.')).value,
      ).toEqual(
        put({
          type: REQUEST_FEED_NOTIFICATIONS_FAILURE,
          payload: {
            message: 'Received undefined list.',
          },
        }),
      );

      expect(generator.next().done).toBeTruthy();
    });

    it('throws an error if the call returns an error', () => {
      const generator = getFeedNotificationsFlow({
        meta: 12,
      });
      expect(generator.next().value).toEqual(call(feedApiCall, 12));

      expect(generator.throw(dummyError).value).toEqual(
        put({
          type: REQUEST_FEED_NOTIFICATIONS_FAILURE,
          payload: dummyError,
        }),
      );

      expect(generator.next().done).toBeTruthy();
    });
  });
});
