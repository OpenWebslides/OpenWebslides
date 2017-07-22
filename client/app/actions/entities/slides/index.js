
export const ADD_SLIDE = 'ADD_SLIDE';
export const UPDATE_SLIDE = 'UPDATE_SLIDE';
export const DELETE_SLIDE = 'DELETE_SLIDE';

export const ADD_CONTENT_ITEM_TO_SLIDE = 'ADD_CONTENT_ITEM_TO_SLIDE';

export function addSlide(slideId, deckId) {
  return {
    type: ADD_SLIDE,
    payload: { slideId, deckId },
  };
}

export function updateSlide(slideId, props) {
  return {
    type: UPDATE_SLIDE,
    payload: { slideId, props },
  };
}

export function deleteSlide(slideId, deckId, contentItemIds = [], newActiveSlideId = null) {
  return {
    type: DELETE_SLIDE,
    payload: { slideId, deckId, contentItemIds, newActiveSlideId },
  }
}

export function addContentItemToSlide(slideId, contentItemType, contentItemTypeProps = {}) {
  return {
    type: ADD_CONTENT_ITEM_TO_SLIDE,
    meta: { slideId, contentItemType, contentItemTypeProps },
  };
}
