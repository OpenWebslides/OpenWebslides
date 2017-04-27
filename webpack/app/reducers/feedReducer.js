import Immutable from 'seamless-immutable';
import { types } from 'actions/feedActions';

const initialState = Immutable({
  listOfFeedElements: [],
  sentRequestForList: false,
  receivedList: false,
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
    default:
      return state;
  }
}

export default feedReducer;
