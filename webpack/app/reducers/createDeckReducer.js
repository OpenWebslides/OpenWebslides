import Immutable from 'seamless-immutable';
import {
  DECK_CREATION_REQUEST,
  DECK_CREATION_REQUEST_FAILURE,
  DECK_CREATION_REQUEST_SUCCESS,
} from 'actions/createDeckActions';

const initialState = Immutable({
  sentCreationRequest: false,
  creationErrorMessage: '',
  creationSucceeded: false,
});

function createDeckReducer(state = initialState, action) {
  switch (action.type) {
    case DECK_CREATION_REQUEST:
      return Immutable.merge(state, {
        sentCreationRequest: true,
        creationErrorMessage: '',
      });
    case DECK_CREATION_REQUEST_FAILURE:
      return Immutable.merge(state, {
        sentCreationRequest: false,
        creationErrorMessage: action.payload,
      });
    case DECK_CREATION_REQUEST_SUCCESS:
      return Immutable.merge(state, {
        sentCreationRequest: false,
        creationErrorMessage: '',
        creationSucceeded: true,
      });
    default:
      return state;
  }
}

export default createDeckReducer;
