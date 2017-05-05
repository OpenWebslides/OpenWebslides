import { call, put } from 'redux-saga/effects';

import { types } from 'actions/feedActions';
import feedApiCall from 'api/feedApiCall';

import { getFeedFlow } from 'sagas/feed/feedSaga';

describe('Feed Saga', () => {
  describe('Request initial list of notifications flow', () => {
    const dummyError = { message: 'blablabla' };

    it('has a happy path', () => {
      const generator = getFeedFlow();
      expect(
        generator.next().value,
      ).toEqual(call(feedApiCall));

      expect(generator.next([1, 2, 3]).value)
        .toEqual(put({
          type: types.RECEIVED_LIST,
          payload: {
            listOfNotifications: [1, 2, 3],
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
