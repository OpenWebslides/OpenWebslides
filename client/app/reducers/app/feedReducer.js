/* eslint-disable no-case-declarations */
import Immutable from 'seamless-immutable';
import _ from 'lodash';

import {
  REQUEST_FEED_NOTIFICATIONS,
  REQUEST_FEED_NOTIFICATIONS_SUCCESS,
  REQUEST_FEED_NOTIFICATIONS_FAILURE,
  CHANGE_TYPE_FILTER,
} from 'actions/feedActions';

const initialState = Immutable({
  listOfFeedNotifications: [],
  sentRequestForList: false,
  receivedList: false,
  errorMessage: '',
  currentOffset: 0,
  typeFilter: 'ALL',
});

function feedReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_FEED_NOTIFICATIONS:
      return Immutable.merge(state, {
        sentRequestForList: true,
        receivedList: false,
      });
    case REQUEST_FEED_NOTIFICATIONS_SUCCESS:
      const newListOfNotifications = _.unionWith(
        state.listOfFeedNotifications,
        action.payload.listOfNotifications,
        (a, b) => a.id === b.id,
      );
      return Immutable.merge(state, {
        sentRequestForList: false,
        receivedList: true,
        errorMessage: '',
        listOfFeedNotifications: newListOfNotifications,
        currentOffset: newListOfNotifications.length,
      });
    case REQUEST_FEED_NOTIFICATIONS_FAILURE:
      return Immutable.merge(state, {
        sentRequestForList: false,
        receivedList: false,
        errorMessage: action.payload,
      });
    case CHANGE_TYPE_FILTER:
      return Immutable.merge(state, {
        typeFilter: action.payload,
      });
    default:
      return state;
  }
}

export default feedReducer;
