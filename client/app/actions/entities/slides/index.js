
export const ADD_SLIDE = 'ADD_SLIDE';
export const UPDATE_SLIDE = 'UPDATE_SLIDE';
export const DELETE_SLIDE = 'DELETE_SLIDE';

export const ADD_CONTENT_ITEM_TO_SLIDE = 'ADD_CONTENT_ITEM_TO_SLIDE';
export const DELETE_CONTENT_ITEM_FROM_SLIDE = 'DELETE_CONTENT_ITEM_FROM_SLIDE';

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

export function addContentItemToSlide(
  slideId,
  contentItemType,
  contentItemTypeProps = {},
  parentItemId = null,
  afterItemId = null,
) {
  return {
    type: ADD_CONTENT_ITEM_TO_SLIDE,
    meta: { slideId, contentItemType, contentItemTypeProps, parentItemId, afterItemId },
  };
}

export function deleteContentItemFromSlide(
  slideId,
  contentItemId,
  ancestorItemIds,
) {
  return {
    type: DELETE_CONTENT_ITEM_FROM_SLIDE,
    meta: { slideId, contentItemId, ancestorItemIds },
  };
}
