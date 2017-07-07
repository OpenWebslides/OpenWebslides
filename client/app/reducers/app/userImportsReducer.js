/* eslint-disable no-case-declarations */
import Immutable from 'seamless-immutable';

import {
  REQUEST_USER_IMPORTS,
  REQUEST_USER_IMPORTS_SUCCESS,
  REQUEST_USER_IMPORTS_FAILURE,
} from 'actions/userImportsActions';

const initialState = Immutable({
  listOfUserImports: [],
  sentRequestForList: false,
  receivedList: false,
});

function feedReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER_IMPORTS:
      return Immutable.merge(state, {
        sentRequestForList: true,
        receivedList: false,
      });
    case REQUEST_USER_IMPORTS_SUCCESS:
      return Immutable.merge(state, {
        sentRequestForList: false,
        receivedList: true,
        listOfUserImports: action.payload.listOfImports,
      });
    case REQUEST_USER_IMPORTS_FAILURE:
      return Immutable.merge(state, {
        sentRequestForList: false,
        receivedList: false,
      });

    default:
      return state;
  }
}

export default feedReducer;
