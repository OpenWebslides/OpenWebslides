import Immutable from 'seamless-immutable';
import _ from 'lodash';

import { PROFILE_PAGE_START_REQUESTS, PROFILE_PAGE_USER_INFO_FAILURE, PROFILE_PAGE_REQUESTS_SUCCESS } from 'actions/app/profile-page';


const initialState = Immutable({
  requestsRunning: false,
  requestsSucceeded: false,
  userInfoError: '',
  userContributionsError: '',
  userDecksError: '',
});


function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_PAGE_START_REQUESTS:
      return Immutable.merge(state, { requestsRunning: true, requestsSucceeded: false });
    case PROFILE_PAGE_USER_INFO_FAILURE:
      return Immutable.merge(state, { requestsRunning: false,
        requestsSucceeded: false,
        userInfoError: action.payload.message });
    case PROFILE_PAGE_REQUESTS_SUCCESS:
      return Immutable.merge(state, { requestsRunning: false, requestsSucceeded: true });
    default:
      return state;
  }
}

export default profilePageReducer;

