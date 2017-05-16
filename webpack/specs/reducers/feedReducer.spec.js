import Immutable from 'seamless-immutable';

import feedReducer from 'reducers/feedReducer';

import { types } from 'actions/feedActions';
import { samples } from '../api/helpers/feedElementsGenerator';

describe('Feed Reducer', () => {
  const emptyState = undefined;

  const stateWithEvents = Immutable({
    listOfFeedElements: samples,
    sentRequestForList: false,
    receivedList: true,
    typeFilter: 'ALL',
  });

  it('has a default immutable state', () => {
    const emptyAction = { type: '' };
    expect(
      feedReducer(
        emptyState,
        emptyAction))
      .toEqual(
        Immutable({
          listOfFeedElements: [],
          sentRequestForList: false,
          receivedList: false,
          typeFilter: 'ALL',
        }));
  });

  it('can resolve REQUEST_FEED_NOTIFICATIONS action', () => {
    expect(
      feedReducer(emptyState, {
        type: types.REQUEST_FEED_NOTIFICATIONS,
      }))
      .toEqual(Immutable({
        listOfFeedElements: [],
        sentRequestForList: true,
        receivedList: false,
        typeFilter: 'ALL',
      }));
  });

  it('can resolve REQUEST_FEED_NOTIFICATIONS_SUCCESS action', () => {
    expect(
      feedReducer(emptyState, {
        type: types.REQUEST_FEED_NOTIFICATIONS_SUCCESS,
        payload: { listOfNotifications: samples },
      }))
      .toEqual(Immutable({
        listOfFeedElements: samples,
        sentRequestForList: false,
        receivedList: true,
        typeFilter: 'ALL',
      }));
  });

  it('can resolve CHANGE_TYPE_FILTER action', () => {
    expect(
      feedReducer(stateWithEvents, {
        type: types.CHANGE_TYPE_FILTER,
        payload: 'testType',
      }))
      .toEqual(Immutable({
        listOfFeedElements: samples,
        sentRequestForList: false,
        receivedList: true,
        typeFilter: 'testType',
      }));
  });
});

