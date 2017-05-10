import Immutable from 'seamless-immutable';
import { types } from 'actions/feedActions';

const initialState = Immutable({
  listOfFeedElements: [],
  sentRequestForList: false,
  receivedList: false,
  requestedMore: false,
  receivedMore: false,
  currentOffset: 0,
  typeFilter: 'ALL',
});

function feedReducer(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_FEED_ELEMENTS:
      return Immutable.merge(state, {
        sentRequestForList: true,
        receivedList: false,
      });
    case types.RECEIVED_LIST:
      return Immutable.merge(state, {
        sentRequestForList: false,
        receivedList: true,
        listOfFeedElements: action.payload.listOfNotifications,
        currentOffset: action.payload.listOfNotifications.length,
      });
    case types.CHANGE_TYPE_FILTER:
      return Immutable.merge(state, {
        typeFilter: action.payload,
      });
    case types.REQUEST_MORE_NOTIFICATIONS:
      return Immutable.merge(state, {
        requestedMore: true,
        receivedMore: false,
      });
    case types.RECEIVED_MORE_NOTIFICATIONS:
      return Immutable.merge(state, {
        requestedMore: false,
        receivedMore: true,
        listOfFeedElements: state.listOfFeedElements.concat(
          action.payload.listOfNotifications,
        ),
        currentOffset: state.currentOffset +
          action.payload.listOfNotifications.length,
      });

    default:
      return state;
  }
}

export default feedReducer;
