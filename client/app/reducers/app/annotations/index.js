import Immutable from 'seamless-immutable';

import { OPEN_ANNOTATION_MODE, CLOSE_ANNOTATION_MODE } from 'actions/app/annotations';


const initialState = Immutable({
  annotationMode: false,
});

export default function annotationReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_ANNOTATION_MODE:
      return state.merge({ annotationMode: true });
    case CLOSE_ANNOTATION_MODE:
      return state.merge({ annotationMode: false });
    default:
      return state;
  }
}
