import Immutable from 'seamless-immutable';

import { imgOptions, iframeOptions } from 'constants/printViewOptions';
import { CHANGE_IMAGE_OPTIONS, CHANGE_IFRAME_OPTIONS, CHANGE_DECORATIVE_IMAGE_OPTIONS } from 'actions/printViewActions';

const initialState = Immutable({
  images: imgOptions.IMAGES_AND_TEXT,
  iframes: iframeOptions.DESCRIPTION,
  decorativeImages: false,
});

function printViewReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_IMAGE_OPTIONS:
      return Immutable.merge(state, {
        images: action.payload,
      });
    case CHANGE_DECORATIVE_IMAGE_OPTIONS:
      return Immutable.merge(state, {
        decorativeImages: action.payload,
      });
    case CHANGE_IFRAME_OPTIONS:
      return Immutable.merge(state, {
        iframes: action.payload,
      });
    default:
      return state;
  }
}

export default printViewReducer;
