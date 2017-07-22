
export const ADD_CONTENT_ITEM = 'ADD_CONTENT_ITEM';
export const UPDATE_CONTENT_ITEM = 'UPDATE_CONTENT_ITEM';
export const DELETE_CONTENT_ITEM = 'DELETE_CONTENT_ITEM';

export function addContentItem(contentItemId, slideId, contentItemType) {
  return {
    type: ADD_CONTENT_ITEM,
    payload: { contentItemId, slideId, contentItemType },
  };
}

export function updateContentItem(contentItemId, props) {
  return {
    type: UPDATE_CONTENT_ITEM,
    payload: { contentItemId, props },
  };
}

export function deleteContentItem(contentItemId, slideId, parentItemId = null, descendantItemIds = []) {
  return {
    type: DELETE_CONTENT_ITEM,
    payload: { contentItemId, slideId, parentItemId, descendantItemIds },
  }
}
