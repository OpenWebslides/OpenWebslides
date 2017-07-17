import Immutable from 'seamless-immutable';

import { imgOptions } from 'constants/printViewOptions';

const initialState = Immutable({
  prefs: {
    images: imgOptions.IMAGES_AND_TEXT,
  },
});

function printViewReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default printViewReducer;
