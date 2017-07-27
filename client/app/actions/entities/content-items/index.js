
export const ADD_CONTENT_ITEM = 'ADD_CONTENT_ITEM';
export const UPDATE_CONTENT_ITEM = 'UPDATE_CONTENT_ITEM';
export const DELETE_CONTENT_ITEM = 'DELETE_CONTENT_ITEM';

export function addContentItem(
  contentItemId,
  contentItemType,
  props,
  slideId,
  parentItemId = null,
  afterItemId = null,
) {
  return {
    type: ADD_CONTENT_ITEM,
    payload: {
      contentItemId,
      contentItemType,
      props,
      slideId,
      parentItemId,
      afterItemId,
    },
  };
}

export function updateContentItem(
  contentItemId,
  props,
  selectionOffsets = null,
) {
  return {
    type: UPDATE_CONTENT_ITEM,
    payload: { contentItemId, props, selectionOffsets },
  };
}

export function deleteContentItem(
  contentItemId,
  slideId,
  parentItemId = null,
  descendantItemIds = [],
  newActiveContentItemId = null,
  newSelectionOffsets = null,
) {
  return {
    type: DELETE_CONTENT_ITEM,
    payload: {
      contentItemId,
      slideId,
      parentItemId,
      descendantItemIds,
      newActiveContentItemId,
      newSelectionOffsets,
    },
  };
}
