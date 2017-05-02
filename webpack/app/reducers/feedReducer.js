import Immutable from 'seamless-immutable';
import { types } from 'actions/feedActions';

const initialState = Immutable({
  listOfFeedElements: [],
  sentRequestForList: false,
  receivedList: false,
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
      });
    case types.CHANGE_TYPE_FILTER:
      return Immutable.merge(state, {
        typeFilter: action.payload,
      });

    default:
      return state;
  }
}

export default feedReducer;
