import Immutable from 'seamless-immutable';
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
      return Immutable.merge(state, {
        sentRequestForList: false,
        receivedList: true,
        errorMessage: '',
        listOfFeedNotifications: state.listOfFeedNotifications.concat(
          action.payload.listOfNotifications,
        ),
        currentOffset:
          state.currentOffset + action.payload.listOfNotifications.length,
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
