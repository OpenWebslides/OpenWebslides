import Immutable from 'seamless-immutable';
import feedReducer from 'reducers/app/feedReducer';

import {
  CHANGE_TYPE_FILTER,
  REQUEST_FEED_NOTIFICATIONS,
  REQUEST_FEED_NOTIFICATIONS_FAILURE,
  REQUEST_FEED_NOTIFICATIONS_SUCCESS,
} from 'actions/feedActions';
import { samples } from '../api/helpers/feedElementsGenerator';

describe('Feed Reducer', () => {
  const emptyState = undefined;
  const stateWithEvents = Immutable({
    listOfFeedNotifications: samples,
    sentRequestForList: false,
    receivedList: false,
    errorMessage: '',
    currentOffset: samples.length,
    typeFilter: 'ALL',
  });
  const stateWithSentRequestAndEvents = Immutable({
    listOfFeedNotifications: samples,
    sentRequestForList: true,
    receivedList: false,
    errorMessage: '',
    currentOffset: samples.length,
    typeFilter: 'ALL',
  });

  it('has a default immutable state', () => {
    const emptyAction = { type: '' };
    expect(feedReducer(emptyState, emptyAction)).toEqual(
      Immutable({
        listOfFeedNotifications: [],
        sentRequestForList: false,
        receivedList: false,
        errorMessage: '',
        currentOffset: 0,
        typeFilter: 'ALL',
      }),
    );
  });
  it('can resolve REQUEST_FEED_NOTIFICATIONS action', () => {
    expect(
      feedReducer(emptyState, {
        type: REQUEST_FEED_NOTIFICATIONS,
      }),
    ).toEqual(
      Immutable({
        listOfFeedNotifications: [],
        sentRequestForList: true,
        receivedList: false,
        errorMessage: '',
        currentOffset: 0,
        typeFilter: 'ALL',
      }),
    );
  });
  it('can resolve REQUEST_FEED_NOTIFICATIONS_SUCCESS action when the list is empty', () => {
    expect(
      feedReducer(emptyState, {
        type: REQUEST_FEED_NOTIFICATIONS_SUCCESS,
        payload: { listOfNotifications: samples },
      }),
    ).toEqual(
      Immutable({
        listOfFeedNotifications: samples,
        sentRequestForList: false,
        receivedList: true,
        errorMessage: '',
        currentOffset: samples.length,
        typeFilter: 'ALL',
      }),
    );
  });
  it('can resolve REQUEST_FEED_NOTIFICATIONS_SUCCESS action when the list contains elements already', () => {
    expect(
      feedReducer(stateWithEvents, {
        type: REQUEST_FEED_NOTIFICATIONS_SUCCESS,
        payload: { listOfNotifications: samples },
      }),
    ).toEqual(
      Immutable({
        listOfFeedNotifications: samples.concat(samples),
        sentRequestForList: false,
        receivedList: true,
        errorMessage: '',
        currentOffset: samples.concat(samples).length,
        typeFilter: 'ALL',
      }),
    );
  });
  it('can resolve CHANGE_TYPE_FILTER action', () => {
    expect(
      feedReducer(stateWithEvents, {
        type: CHANGE_TYPE_FILTER,
        payload: 'testType',
      }),
    ).toEqual(
      Immutable({
        listOfFeedNotifications: samples,
        sentRequestForList: false,
        receivedList: false,
        errorMessage: '',
        currentOffset: samples.length,
        typeFilter: 'testType',
      }),
    );
  });
  it('can resolve REQUEST_FEED_NOTIFICATIONS_FAILURE action', () => {
    expect(
      feedReducer(stateWithSentRequestAndEvents, {
        type: REQUEST_FEED_NOTIFICATIONS_FAILURE,
        payload: 'error message',
      }),
    ).toEqual(
      Immutable({
        listOfFeedNotifications: samples,
        sentRequestForList: false,
        receivedList: false,
        errorMessage: 'error message',
        currentOffset: samples.length,
        typeFilter: 'ALL',
      }),
    );
  });
});
